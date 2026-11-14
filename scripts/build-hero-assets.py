#!/usr/bin/env python3
"""Build the seamless looping hero clip, portrait still and OG image.
Usage: python3 scripts/build-hero-assets.py intro.mp4 [portrait.jpg] [--crop W:H:X:Y]
Requires ffmpeg + numpy. Source 1920x1080 default crop: 832:1040:544:30 (centred, head to toe)."""
import subprocess, sys, os, wave, numpy as np
args=[a for a in sys.argv[1:] if not a.startswith("--")]
crop="832:1040:544:30"
for a in sys.argv[1:]:
    if a.startswith("--crop="): crop=a.split("=",1)[1]
src=args[0]; photo=args[1] if len(args)>1 else None
OUT="public/hero"; os.makedirs(OUT,exist_ok=True); T="/tmp/hero_build"; os.makedirs(T,exist_ok=True)
D=10.0; X=0.5; SR=48000
def run(*c): subprocess.run(c,check=True)
vf=f"crop={crop},scale=768:960,colorlevels=rimax=0.92:gimax=0.92:bimax=0.92,fps=24"
# 1) video: crossfade last X seconds into the first X seconds (xfade); result length D-X
# loop = blend(tail->head) + middle section; the last frame flows into the blend's first frame.
fc=(f"[0:v]{vf},split=3[a][b][c];"
    f"[a]trim={X}:{D-X},setpts=PTS-STARTPTS[mid];"
    f"[b]trim={D-X}:{D},setpts=PTS-STARTPTS[tail];"
    f"[c]trim=0:{X},setpts=PTS-STARTPTS[head];"
    f"[tail][head]xfade=transition=fade:duration={X}:offset=0[blend];"
    f"[blend][mid]concat=n=2:v=1:a=0,format=yuv420p[v]")
# loop = blend(tail->head) + middle ; length = X + (D-2X) = D-X, and last frame flows into the blend's first frame.
run("ffmpeg","-y","-v","error","-t",str(D),"-i",src,"-filter_complex",fc,"-map","[v]","-an","-r","24",f"{T}/v.mp4")
# 2) audio: sample-accurate equal-power crossfade in numpy, same structure
run("ffmpeg","-y","-v","error","-t",str(D),"-i",src,"-vn","-ac","1","-ar",str(SR),f"{T}/a.wav")
w=wave.open(f"{T}/a.wav"); a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float64); w.close()
n=int(X*SR); a=np.pad(a,(0,max(0,int(D*SR)-len(a))))[:int(D*SR)]
head,mid,tail=a[:n],a[n:len(a)-n],a[-n:]
t=np.linspace(0,np.pi/2,n); blend=tail*np.cos(t)+head*np.sin(t)
loop=np.concatenate([blend,mid]).astype(np.int16)
w=wave.open(f"{T}/loop.wav","wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(loop.tobytes()); w.close()
# 3) export
run("ffmpeg","-y","-v","error","-i",f"{T}/v.mp4","-i",f"{T}/loop.wav","-c:v","libx264","-crf","24","-preset","slow","-pix_fmt","yuv420p","-c:a","aac","-b:a","96k","-movflags","+faststart","-shortest",f"{OUT}/hero.mp4")
run("ffmpeg","-y","-v","error","-i",f"{T}/v.mp4","-i",f"{T}/loop.wav","-c:v","libvpx-vp9","-crf","36","-b:v","0","-c:a","libopus","-b:a","80k","-shortest",f"{OUT}/hero.webm")
# 4) portrait + OG
if photo:
    run("ffmpeg","-y","-v","error","-i",photo,"-vf","crop=ih*0.8:ih:(iw-ih*0.8)/2:0,scale=480:600","public/portrait-bust.webp")
    run("ffmpeg","-y","-v","error","-i",photo,"-vf","crop=iw:iw*630/1200:0:0,scale=1200:630","-q:v","3","public/og.jpg")
else:
    run("ffmpeg","-y","-v","error","-ss","3","-i",src,"-vf",f"crop={crop},scale=768:960,crop=480:600:144:0,scale=480:600","-frames:v","1","public/portrait-bust.webp")
    run("ffmpeg","-y","-v","error","-ss","3","-i",src,"-vf",f"crop={crop},scale=768:960,crop=768:403:0:0,scale=1200:630","-frames:v","1","-q:v","3","public/og.jpg")
print("done")
