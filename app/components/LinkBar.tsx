import React from 'react'
import { Github, Instagram, FileText, Linkedin } from 'lucide-react'

const LinkBar = () => {
  return (
    <div className='absolute bottom-3 left-0 right-0 mx-auto md:w-[800px] w-[90%] h-9 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center'>
        <div className='flex items-center justify-center gap-4'>
            <div className='flex gap-3'>
                <a href='https://github.com/Pedro-Picardi' target='_blank' rel='noopener noreferrer' className='text-muted-foreground text-highlight/40 hover:text-highlight transition-transform duration-200 hover:scale-110'>
                    <Github size={20} strokeWidth={2} />
                </a>
                <a href='https://instagram.com/pedropicardi' target='_blank' rel='noopener noreferrer' className='text-muted-foreground text-highlight/40 hover:text-highlight transition-transform duration-200 hover:scale-110'>
                    <Instagram size={20} strokeWidth={2} />
                </a>
                <a href='https://www.linkedin.com/in/pedro-picardi/' target='_blank' rel='noopener noreferrer' className='text-muted-foreground text-highlight/40 hover:text-highlight transition-transform duration-200 hover:scale-110'>
                    <Linkedin size={20} strokeWidth={2} />
                </a>
                <div className="w-[1px] h-[20px] mx-4 bg-highlight/40"></div>
                <a href='/path-to-cv.pdf' download className='text-muted-foreground text-highlight/40 hover:text-highlight transition-transform duration-200 hover:scale-105 flex items-center gap-1'>
                    <FileText size={20} strokeWidth={2} />
                    <span className='text-sm font-silkamono tracking-[-1px]'>Download CV</span>
                </a>
            </div>
        </div>
    </div>
  )
}

export default LinkBar