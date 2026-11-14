import { ArrowLeft } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react';
import { useState } from 'react';
import axios from "axios"
import { serverUrl } from '../App';
import Editor from '@monaco-editor/react';

const PHASES = [
  "Analyzing your requirements...",
  "Designing your website layout...",
  "Generating your components...",
  "Crafting your website structure...",
  "Applying styles and animations...",
  "Optimizing your code...",
  "Finalizing your website preview..."
];
function Generate() {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");
    
const handleGenerateWebsite = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
        const res = await axios.post(
            `${serverUrl}/api/website/generate`,
            { prompt },
            { withCredentials: true }
        );

        console.log("Website creation response:", res.data);

        const websiteId =
            res.data.websiteId ||
            res.data.website?._id ||
            res.data._id;

        if (!websiteId) {
            throw new Error(
                "Website was created, but no website ID was returned."
            );
        }

        setProgress(100);
        navigate(`/editor/${websiteId}`);
    } catch (e) {
        console.error("Website generation failed:", e);

        setError(
            e.response?.data?.message ||
            e.message ||
            "Something went wrong."
        );
    } finally {
        setLoading(false);
    }
};


    useEffect(()=> {
            if(!loading){
                setPhaseIndex(0);
                setProgress(0);
                return;
            }
    
            let value = 0;
            let phase = 0;
    
            const interval = setInterval(()=>{
                const increment = value < 20 
                                ? Math.random() * 1.5
                                : value < 60 
                                ? Math.random() * 1.2
                                : Math.random() * 0.6;
                value += increment
    
                if(value>=93)value=93;
    
                phase=Math.min(Math.floor((value/100)*PHASES.length), PHASES.length-1);
    
                setProgress(Math.floor(value));
                setPhaseIndex(phase);
    
            }, 1200)
    
            return ()=>clearInterval(interval);
        }, [loading])
  return (
    <div className='min-h-screen bg-linear-to-br from-[#050505] via-[#0b0b0b] to-[#050505] text-white'>
      <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
            <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <button className='p-2 rounded-lg hover:bg-white/10 transition' onClick={()=>navigate("/")}><ArrowLeft size={16}/></button>
                    <h1 className='text-lg font-semibold'>WebForge<span className='text-zinc-400'>.Ai</span></h1>
                </div>
            </div>
        </div>

        <div className='max-w-6xl mx-auto px-6 py-16'>
            <motion.div
                initial={{opacity:0, y:30}}
                animate={{opacity:1, y:0}}
                className='text-center mb-16'
            >
                <h1 className='text-4xl md:text-5xl font-bold mb-5 leading-tight'>
                    Build Websites with
                    <span className='block bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent'>Real Ai Power</span>
                </h1>
                <p className='text-zinc-400 max-w-2xl mx-auto'>
                    This process may takes several minutes.
                    WebForge.Ai focuses on quality, not shortcuts.
                </p>
            </motion.div>
            <div className='mb-14'>
                <h1 className='text-xl font-semibold mb-2'>Describe your website</h1>
                <div className='relative'>
                    <textarea 
                    onChange={(e)=>setPrompt(e.target.value)}
                    value={prompt}
                    placeholder='Describe your website in detail...' className='w-full h-56 p-6 rounded-3xl bg-black/60 border border-white/10 outline-none resize-none text-sm leading-relaxed focus:ring-2 focus:ring-white/20'>

                    </textarea>
                </div>

                {error && <p className='mt-4 text-sm text-red-400'>{error}</p>}
            </div>
            <div className='flex justify-center'>
                <motion.div
                    whileHover={{scale: 1.05}}
                    whileTap={{scale:0.96}}
                    disabled={!prompt.trim() && loading}
                    className={`px-14 py-4 rounded-2xl font-semibold text-lg ${prompt.trim() && !loading ? "bg-white text-black" : "bg-white/20 text-zinc-400 cursor-not-allowed"}`}
                    onClick={handleGenerateWebsite}
                >
                    Generate Website
                </motion.div>
            </div>

            {loading && (
                <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    className="max-w-xl mx-auto mt-12"
                > 

                    <div className='flex justify-between mb-2 text-xs text-zinc-400'>
                        <span>{PHASES[phaseIndex]}</span>
                        <span>{progress}%</span>
                    </div>

                    <div className='h-2 w-full bg-white/10 rounded-full overflow-hidden'>
                        <motion.div 
                        className='h-full bg-linear-to-r from-white to-zinc-300'
                        animate={{width:`${progress}%`}}
                        transition={{ease:"easeOut", duration:0.8}}
                        />
                    </div>

                    <div className='text-center text-xs text-zinc-400 mt-4'>
                        Estimated time remaining:{" "}
                        <span className='text-white font-medium'>
                            ~8-12 minutes
                        </span>
                    </div> 
                </motion.div>
            )}
        </div>
    </div>
  )
}

export default Generate
