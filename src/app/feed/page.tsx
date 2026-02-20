'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { Heart, MessageCircle, Share2, Play, Pause, ChevronLeft, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLAYERS } from '@/data/historicalData';

interface Highlight {
    id: string;
    video_url: string;
    player_name: string;
    match_date: string;
    created_at: string;
    likes: number;
}

interface Comment {
    id: string;
    highlight_id: string;
    author_name: string;
    content: string;
    created_at: string;
}

export default function FeedPage() {
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);

    // Comments State
    const [activeCommentsHighlightId, setActiveCommentsHighlightId] = useState<string | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [newCommentText, setNewCommentText] = useState('');
    const [commentAuthor, setCommentAuthor] = useState<string>('');

    // Refs for observing videos to autoplay/pause
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    useEffect(() => {
        fetchFeed();
    }, []);

    const fetchFeed = async () => {
        if (!supabase) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('player_highlights')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setHighlights(data || []);
        } catch (error) {
            console.error('Error fetching feed:', error);
        } finally {
            setLoading(false);
        }
    };

    // Intersection Observer for autoplaying videos in view
    useEffect(() => {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.6 // Trigger when 60% of the video is visible
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                const videoEl = entry.target as HTMLVideoElement;
                const index = Number(videoEl.dataset.index);

                if (entry.isIntersecting) {
                    setActiveVideoIndex(index);
                    videoEl.play().catch(e => console.log('Autoplay blocked', e));
                } else {
                    videoEl.pause();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        videoRefs.current.forEach(video => {
            if (video) observer.observe(video);
        });

        return () => {
            observer.disconnect();
        };
    }, [highlights]);


    const handleLike = async (id: string, currentLikes: number) => {
        if (!supabase) return;
        try {
            // Optimistic update
            setHighlights(prev => prev.map(h =>
                h.id === id ? { ...h, likes: currentLikes + 1 } : h
            ));

            const { error } = await supabase.rpc('increment_likes', { highlight_row_id: id });
            if (error) throw error;
        } catch (err) {
            console.error('Error liking:', err);
            // Revert optimistic update (simplistic)
            setHighlights(prev => prev.map(h =>
                h.id === id ? { ...h, likes: currentLikes } : h
            ));
        }
    };

    const openComments = async (highlightId: string) => {
        setActiveCommentsHighlightId(highlightId);
        setLoadingComments(true);
        setComments([]);
        if (!supabase) return;

        try {
            const { data, error } = await supabase
                .from('highlight_comments')
                .select('*')
                .eq('highlight_id', highlightId)
                .order('created_at', { ascending: true });

            if (error) {
                // Si la tabla no existe aún, atrapamos el error limpiamente
                if (error.code === '42P01') {
                    console.warn("Tabla highlight_comments no existe todavía.");
                    setComments([]);
                } else {
                    throw error;
                }
            } else {
                setComments(data || []);
            }
        } catch (err) {
            console.error('Error fetching comments:', err);
        } finally {
            setLoadingComments(false);
        }
    };

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase || !activeCommentsHighlightId || !newCommentText.trim() || !commentAuthor) return;

        const newComment = {
            highlight_id: activeCommentsHighlightId,
            author_name: commentAuthor,
            content: newCommentText.trim()
        };

        try {
            const { data, error } = await supabase
                .from('highlight_comments')
                .insert([newComment])
                .select('*')
                .single();

            if (error) throw error;
            if (data) {
                setComments(prev => [...prev, data]);
                setNewCommentText('');
            }
        } catch (err) {
            console.error('Error adding comment:', err);
            alert('Error agregando el comentario. Asegúrate de haber ejecutado el SQL setup_comments.sql en Supabase.');
        }
    };

    const shareVideo = (url: string) => {
        if (navigator.share) {
            navigator.share({
                title: 'Mirá este jugadón del picado ⚽🔥',
                url: url
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(url);
            alert("URL del video copiada al portapapeles");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white pb-safe">
                <div className="w-12 h-12 border-t-2 border-accent-orange rounded-full animate-spin" />
                <p className="pwa-subtitle mt-4">Cargando jugadas...</p>
                <Navbar />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#0A0A0A] overflow-hidden text-white relative">

            {/* TIKTOK STYLE FEED CONTAINER */}
            {/* snap-y mandatory for TikTok feel. h-[100dvh] pb-safe */}
            <div className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory touch-pan-y no-scrollbar pb-[80px]">

                {highlights.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-white/40">
                        <p className="text-sm font-black uppercase tracking-widest">Aún no hay videos subidos</p>
                    </div>
                )}

                {highlights.map((highlight, index) => (
                    <div
                        key={highlight.id}
                        className="w-full h-[100dvh] snap-start relative bg-black flex items-center justify-center overflow-hidden"
                    >
                        {/* THE VIDEO */}
                        <video
                            ref={el => {
                                if (el) videoRefs.current[index] = el;
                            }}
                            data-index={index}
                            src={highlight.video_url}
                            className="w-full h-full object-cover"
                            loop
                            playsInline
                            muted={false} // Allow sound, user might have to tap to unmute on some browsers
                            onClick={(e) => {
                                const video = e.currentTarget;
                                if (video.paused) video.play();
                                else video.pause();
                            }}
                        />

                        {/* Top Gradient for text readability */}
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

                        {/* Bottom Gradient for text readability */}
                        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                        {/* INFO OVERLAYS */}
                        <div className="absolute bottom-[100px] left-4 right-16 z-20">
                            <h3 className="text-xl font-black italic uppercase drop-shadow-lg">{highlight.player_name}</h3>
                            <p className="text-xs font-bold text-white/80 drop-shadow-md mt-1">
                                {highlight.match_date ? `Picado del ${highlight.match_date.split('-').reverse().join('/')}` : 'Jugada Histórica'}
                            </p>
                        </div>

                        {/* ACTION BUTTONS (Right Side) */}
                        <div className="absolute bottom-[100px] right-4 z-20 flex flex-col items-center gap-6">
                            <button
                                onClick={() => handleLike(highlight.id, highlight.likes || 0)}
                                className="flex flex-col items-center gap-1 group active:scale-90 transition-transform"
                            >
                                <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                    <Heart size={28} className={highlight.likes > 0 ? "fill-red-500 text-red-500" : "text-white"} />
                                </div>
                                <span className="text-[10px] font-black drop-shadow-md">{highlight.likes || 0}</span>
                            </button>

                            <button
                                onClick={() => openComments(highlight.id)}
                                className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                            >
                                <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                    <MessageCircle size={28} className="text-white fill-white/20" />
                                </div>
                                <span className="text-[10px] font-black drop-shadow-md">Coments</span>
                            </button>

                            <button
                                onClick={() => shareVideo(highlight.video_url)}
                                className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                            >
                                <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                    <Share2 size={28} className="text-white" />
                                </div>
                                <span className="text-[10px] font-black drop-shadow-md">Share</span>
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            {/* COMMENTS BOTTOM SHEET */}
            <AnimatePresence>
                {activeCommentsHighlightId && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCommentsHighlightId(null)}
                            className="fixed inset-0 bg-black/60 z-[101] backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 h-[70vh] bg-[#121212] z-[102] rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/10 flex flex-col overflow-hidden"
                        >
                            {/* Sheet Handle */}
                            <div className="w-full flex justify-center py-3 sticky top-0 bg-[#121212] z-10 border-b border-white/5">
                                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
                                <h4 className="text-sm font-black italic uppercase tracking-widest text-center mb-6 text-white/60">Comentarios</h4>

                                {loadingComments ? (
                                    <div className="flex justify-center py-10">
                                        <div className="w-8 h-8 border-t-2 border-white/40 rounded-full animate-spin" />
                                    </div>
                                ) : comments.length === 0 ? (
                                    <div className="text-center py-10 text-white/30 text-xs uppercase font-bold tracking-widest">
                                        Sé el primero en comentar esta locura.
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-6">
                                        {comments.map((c) => (
                                            <div key={c.id} className="flex gap-3">
                                                <div className="w-8 h-8 rounded-full bg-accent-orange/20 text-accent-orange flex items-center justify-center font-black text-xs shrink-0 border border-accent-orange/20">
                                                    {c.author_name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-white/60 font-black tracking-widest">{c.author_name}</span>
                                                    <p className="text-sm font-medium mt-0.5">{c.content}</p>
                                                    <span className="text-[9px] text-white/30 mt-1">
                                                        {new Date(c.created_at).toLocaleDateString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Comment Input */}
                            <div className="bg-[#1A1A1A] p-4 pb-8 sm:pb-4 border-t border-white/10">
                                <form onSubmit={submitComment} className="flex flex-col gap-3">
                                    <div className="flex gap-2">
                                        <select
                                            value={commentAuthor}
                                            onChange={(e) => setCommentAuthor(e.target.value)}
                                            className="bg-black border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-accent-orange disabled:opacity-50"
                                            required
                                        >
                                            <option value="" disabled>¿Quién sos?</option>
                                            {PLAYERS.map(p => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                            <option value="Invitado">Invitado</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2 items-end">
                                        <input
                                            type="text"
                                            value={newCommentText}
                                            onChange={(e) => setNewCommentText(e.target.value)}
                                            placeholder="Escribí un comentario..."
                                            className="flex-1 bg-black border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!newCommentText.trim() || !commentAuthor}
                                            className="p-3 bg-accent-orange hover:bg-orange-600 disabled:opacity-50 disabled:bg-white/10 disabled:text-white/30 text-black font-bold rounded-2xl transition-colors shrink-0"
                                        >
                                            <Send size={20} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <Navbar />
        </main>
    );
}
