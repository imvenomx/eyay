"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Lanyard from "@/components/ui/lanyard";

/**
 * Auto-generates an Eey Aay branded card texture and renders the 3D lanyard.
 * No user input controls — purely visual.
 */
export default function EeyAayLanyard({
    position = [0, 0, 20] as [number, number, number],
    containerClassName,
}: {
    position?: [number, number, number];
    containerClassName?: string;
}) {
    const [cardTextureUrl, setCardTextureUrl] = useState<string | undefined>(undefined);
    const [textureKey, setTextureKey] = useState(0);
    const hasGenerated = useRef(false);

    const generateTexture = useCallback(() => {
        if (hasGenerated.current) return;
        hasGenerated.current = true;

        const CANVAS_SIZE = 1376;
        const canvas = document.createElement("canvas");
        canvas.width = CANVAS_SIZE;
        canvas.height = CANVAS_SIZE;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        // Black background
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Subtle grid pattern
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.lineWidth = 1;
        for (let i = 0; i < CANVAS_SIZE; i += 48) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, CANVAS_SIZE);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(CANVAS_SIZE, i);
            ctx.stroke();
        }

        // Diagonal accent line
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, CANVAS_SIZE * 0.4);
        ctx.lineTo(CANVAS_SIZE, CANVAS_SIZE * 0.1);
        ctx.stroke();

        // Another diagonal
        ctx.beginPath();
        ctx.moveTo(0, CANVAS_SIZE * 0.42);
        ctx.lineTo(CANVAS_SIZE, CANVAS_SIZE * 0.12);
        ctx.stroke();

        // Logo text - EEY AAY
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 100px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("EEY", CANVAS_SIZE / 2, CANVAS_SIZE * 0.32);
        ctx.fillText("AAY", CANVAS_SIZE / 2, CANVAS_SIZE * 0.42);

        // Subtitle
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.font = "32px monospace";
        ctx.fillText("AI & AUTOMATION", CANVAS_SIZE / 2, CANVAS_SIZE * 0.52);

        // Small decorative dot
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE * 0.24, 6, 0, Math.PI * 2);
        ctx.fill();

        // Bottom text
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.font = "24px monospace";
        ctx.fillText("PARTNER", CANVAS_SIZE / 2, CANVAS_SIZE * 0.7);

        const dataUrl = canvas.toDataURL("image/png");
        setCardTextureUrl(dataUrl);
        setTextureKey((prev) => prev + 1);
    }, []);

    useEffect(() => {
        generateTexture();
    }, [generateTexture]);

    return (
        <Lanyard
            key={textureKey}
            position={position}
            containerClassName={containerClassName}
            cardTextureUrl={cardTextureUrl}
        />
    );
}
