'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import {
    AlertTriangle,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    Plus,
    X,
    Send,
    User,
    Clock,
    ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLAYERS } from '@/data/historicalData';

interface Claim {
    id: string;
    author_name: string;
    title: string;
    content: string;
    thumbs_up: number;
    thumbs_down: number;
    created_at: string;
    comments_count?: number;
}

interface ClaimComment {
    id: string;
    claim_id: string;
    author_name: string;
    content: string;
    created_at: string;
}

export default function ClaimsPage() {
    const [claims, setClaims] = useState<Claim[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form state
    const [newClaimTitle, setNewClaimTitle] = useState('');
    const [newClaimContent, setNewClaimContent] = useState('');
    const [newClaimAuthor, setNewClaimAuthor] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Comments state
    const [activeClaimId, setActiveClaimId] = useState<string | null>(null);
    const [comments, setComments] = useState<ClaimComment[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [newCommentText, setNewCommentText] = useState('');
    const [commentAuthor, setCommentAuthor] = useState('');

    useEffect(() => {
        fetchClaims();
    }, []);

    const fetchClaims = async () => {
        if (!supabase) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('claims')
                .select(`
          *,
          claim_comments(count)
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const formattedData = data.map((item: any) => ({
                ...item,
                comments_count: item.claim_comments[0]?.count || 0
            }));

            setClaims(formattedData);
        } catch (error) {
            console.error('Error fetching claims:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateClaim = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase || !newClaimTitle || !newClaimContent || !newClaimAuthor) return;

        setSubmitting(true);
        try {
            const { error } = await supabase
                .from('claims')
                .insert([{
                    title: newClaimTitle,
                    content: newClaimContent,
                    author_name: newClaimAuthor
                }]);

            if (error) throw error;

            setNewClaimTitle('');
            setNewClaimContent('');
            setNewClaimAuthor('');
            setShowAddForm(false);
            fetchClaims();
        } catch (error) {
            console.error('Error creating claim:', error);
            alert('Error al crear el reclamo');
        } finally {
            setSubmitting(false);
        }
    };

    const handleVote = async (id: string, type: 'up' | 'down') => {
        if (!supabase) return;
        try {
            // Optimistic update
            setClaims(prev => prev.map(c => {
                if (c.id === id) {
                    return {
                        ...c,
                        thumbs_up: type === 'up' ? c.thumbs_up + 1 : c.thumbs_up,
                        thumbs_down: type === 'down' ? c.thumbs_down + 1 : c.thumbs_down
                    };
                }
                return c;
            }));

            const { error } = await supabase.rpc('vote_claim', {
                claim_id: id,
                vote_type: type
            });

            if (error) throw error;
        } catch (error) {
            console.error('Error voting:', error);
            // Re-fetch to sync
            fetchClaims();
        }
    };

    const openComments = async (claimId: string) => {
        setActiveClaimId(claimId);
        setLoadingComments(true);
        setComments([]);
        if (!supabase) return;

        try {
            const { data, error } = await supabase
                .from('claim_comments')
                .select('*')
                .eq('claim_id', claimId)
                .order('created_at', { ascending: true });

            if (error) throw error;
            setComments(data || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoadingComments(false);
        }
    };

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase || !activeClaimId || !newCommentText.trim() || !commentAuthor) return;

        try {
            const { data, error } = await supabase
                .from('claim_comments')
                .insert([{
                    claim_id: activeClaimId,
                    author_name: commentAuthor,
                    content: newCommentText.trim()
                }])
                .select()
                .single();

            if (error) throw error;

            setComments(prev => [...prev, data]);
            setNewCommentText('');

            // Update count locally
            setClaims(prev => prev.map(c =>
                c.id === activeClaimId ? { ...c, comments_count: (c.comments_count || 0) + 1 } : c
            ));
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white pb-32">
            <Navbar />

            <div className="pwa-mesh pointer-events-none">
                <div className="mesh-orb-1 opacity-10" />
                <div className="mesh-orb-2 opacity-10" />
            </div>

            <header className="px-6 pt-14 pb-8 flex justify-between items-end bg-[#0A0A0A]/80 backdrop-blur-xl sticky top-0 z-30 border-b border-white/5">
                <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Mesa de Entradas</p>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter">RECLAMOS</h1>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="w-12 h-12 bg-accent-orange rounded-2xl flex items-center justify-center shadow-lg shadow-black/20 hover:scale-105 transition-transform"
                >
                    <Plus size={24} className="text-black" strokeWidth={3} />
                </button>
            </header>

            <div className="px-6 py-8 space-y-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-t-2 border-accent-orange rounded-full animate-spin" />
                        <p className="text-[10px] font-black uppercase tracking-widest mt-4 text-white/40">Cargando quejas...</p>
                    </div>
                ) : claims.length === 0 ? (
                    <div className="pwa-card p-12 text-center opacity-40">
                        <AlertTriangle size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="text-xs font-black uppercase tracking-widest italic">Nadie se quejó todavía... ¿Sospechoso?</p>
                    </div>
                ) : (
                    claims.map((claim) => (
                        <motion.div
                            key={claim.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pwa-card p-6 border-white/5 bg-white/[0.02] flex flex-col gap-4"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black uppercase italic text-white/40">
                                        {claim.author_name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-accent-orange tracking-widest leading-none mb-1">{claim.author_name}</p>
                                        <div className="flex items-center gap-1 text-[8px] font-bold text-white/20 uppercase tracking-widest">
                                            <Clock size={8} />
                                            {new Date(claim.created_at).toLocaleDateString('es-AR')}
                                        </div>
                                    </div>
                                </div>
                                <div className="pwa-pill !text-[8px] bg-white/5 border-white/10 text-white/40">ID: #{claim.id.slice(0, 4)}</div>
                            </div>

                            <div>
                                <h3 className="text-lg font-black italic uppercase tracking-tight mb-1">{claim.title}</h3>
                                <p className="text-sm text-white/60 font-medium leading-relaxed">{claim.content}</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleVote(claim.id, 'up')}
                                        className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl hover:bg-green-500/20 transition-colors"
                                    >
                                        <ThumbsUp size={16} className="text-green-500" />
                                        <span className="text-xs font-black">{claim.thumbs_up}</span>
                                    </button>
                                    <button
                                        onClick={() => handleVote(claim.id, 'down')}
                                        className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl hover:bg-red-500/20 transition-colors"
                                    >
                                        <ThumbsDown size={16} className="text-red-500" />
                                        <span className="text-xs font-black">{claim.thumbs_down}</span>
                                    </button>
                                </div>

                                <button
                                    onClick={() => openComments(claim.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl hover:bg-accent-orange/20 transition-colors"
                                >
                                    <MessageSquare size={16} className="text-accent-orange" />
                                    <span className="text-xs font-black uppercase italic tracking-widest">
                                        {claim.comments_count || 0} COMENTS
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* CREATE CLAIM MODAL */}
            <AnimatePresence>
                {showAddForm && (
                    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAddForm(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="relative w-full max-w-lg bg-[#121212] rounded-t-[40px] sm:rounded-[40px] border-t sm:border border-white/10 p-8 pt-10"
                        >
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/40"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">NUEVA QUEJA</h2>

                            <form onSubmit={handleCreateClaim} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-2 italic">¿Quién sos?</label>
                                    <select
                                        value={newClaimAuthor}
                                        onChange={(e) => setNewClaimAuthor(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-accent-orange"
                                        required
                                    >
                                        <option value="" disabled>Seleccioná tu nombre...</option>
                                        {PLAYERS.map(p => <option key={p} value={p}>{p}</option>)}
                                        <option value="Invitado">Invitado</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-2 italic">Asunto</label>
                                    <input
                                        type="text"
                                        value={newClaimTitle}
                                        onChange={(e) => setNewClaimTitle(e.target.value)}
                                        placeholder="Ej: El VAR nos cagó"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-accent-orange"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest ml-2 italic">Detalle del Reclamo</label>
                                    <textarea
                                        value={newClaimContent}
                                        onChange={(e) => setNewClaimContent(e.target.value)}
                                        placeholder="Contá qué pasó..."
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-accent-orange resize-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting || !newClaimTitle || !newClaimContent || !newClaimAuthor}
                                    className="w-full py-5 bg-accent-orange text-black font-black uppercase italic tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    {submitting ? 'ENVIANDO...' : 'PRESENTAR RECLAMO'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* COMMENTS BOTTOM SHEET */}
            <AnimatePresence>
                {activeClaimId && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveClaimId(null)}
                            className="fixed inset-0 bg-black/60 z-[101] backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 h-[75vh] bg-[#121212] z-[102] rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/10 flex flex-col overflow-hidden"
                        >
                            <div className="w-full flex justify-center py-3 sticky top-0 bg-[#121212] z-10 border-b border-white/5">
                                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
                                <h4 className="text-sm font-black italic uppercase tracking-widest text-center mb-6 text-white/60">Discusión del Reclamo</h4>

                                {loadingComments ? (
                                    <div className="flex justify-center py-10">
                                        <div className="w-8 h-8 border-t-2 border-accent-orange rounded-full animate-spin" />
                                    </div>
                                ) : comments.length === 0 ? (
                                    <div className="text-center py-10 text-white/30 text-xs uppercase font-bold tracking-widest italic">
                                        Nadie opinó todavía... ¡Meté púa!
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-6">
                                        {comments.map((c) => (
                                            <div key={c.id} className="flex gap-3">
                                                <div className="w-8 h-8 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center font-black text-[10px] shrink-0 border border-accent-orange/20">
                                                    {c.author_name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col max-w-[85%]">
                                                    <span className="text-[10px] text-white/40 font-black tracking-widest uppercase">{c.author_name}</span>
                                                    <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 mt-1 border border-white/5">
                                                        <p className="text-sm font-medium leading-relaxed">{c.content}</p>
                                                    </div>
                                                    <span className="text-[8px] text-white/20 font-bold mt-1 ml-1">
                                                        {new Date(c.created_at).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Comment Input */}
                            <div className="bg-[#1A1A1A] p-6 pb-safe border-t border-white/10">
                                <form onSubmit={submitComment} className="flex flex-col gap-4">
                                    <div className="flex gap-2">
                                        <select
                                            value={commentAuthor}
                                            onChange={(e) => setCommentAuthor(e.target.value)}
                                            className="bg-black border border-white/10 rounded-xl px-4 py-3 text-[10px] font-black uppercase text-white focus:outline-none focus:border-accent-orange"
                                            required
                                        >
                                            <option value="" disabled>IDENTIFICATE...</option>
                                            {PLAYERS.map(p => <option key={p} value={p}>{p}</option>)}
                                            <option value="Invitado">Invitado</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2 items-end">
                                        <input
                                            type="text"
                                            value={newCommentText}
                                            onChange={(e) => setNewCommentText(e.target.value)}
                                            placeholder="Agregá tu opinión..."
                                            className="flex-1 bg-black border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!newCommentText.trim() || !commentAuthor}
                                            className="w-14 h-14 bg-accent-orange hover:bg-orange-600 disabled:opacity-50 disabled:bg-white/10 disabled:text-white/30 text-black flex items-center justify-center rounded-2xl transition-all shrink-0"
                                        >
                                            <Send size={20} strokeWidth={3} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
}
