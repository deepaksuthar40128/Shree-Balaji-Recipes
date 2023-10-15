'use client'
import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}
 
const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const ReactQuill = require('react-quill');

    return (
        <ReactQuill 
            value={value}
            onChange={(content: string) => {
                onChange(content);
            }} 
        />
    );
};

export default Editor;
