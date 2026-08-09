# 🚀 ABTalks 60-Day Challenge Platform

![ABTalks Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop)

A gamified, mobile-first web application designed to help college students build consistency through daily coding challenges, track their streaks, and showcase their proof of work to hiring partners.

**Live Demo:** [https://hackathon-ab-talks.vercel.app](https://hackathon-ab-talks.vercel.app)

---

## 🎯 The Problem
Students often struggle with consistency when learning to code. Traditional courses lack accountability, and building a portfolio from scratch feels overwhelming.

## 💡 Our Solution
ABTalks gamifies the learning process. By breaking down complex skills into **60 daily micro-tasks**, students build a habit of shipping code every day. 
- **Accountability:** Daily streaks, Streak Shields, and a global leaderboard.
- **Proof of Work:** Every submission requires a GitHub commit or LinkedIn post.
- **Discoverability:** A public profile that hiring partners can view to see a student's actual consistency and capability.

---

## ✨ Key Features

- **🔒 Secure Authentication:** Powered by Firebase Google Auth with smart fallback mechanisms to bypass strict browser tracking-blockers.
- **📊 Interactive Dashboard:** A dynamic progress ring, streak tracking, and a 60-day calendar heatmap.
- **🏆 Gamification Engine:** Unlockable achievements, dynamic badges, and Streak Shields to protect progress.
- **📱 Mobile-First Premium UI:** Built with dark-mode glassmorphism, fluid micro-animations, and responsive bottom navigation.
- **🔥 Real-time Database:** Instant profile updates and submission tracking powered by Firestore.

---

## 🛠️ Technology Stack

- **Frontend:** React.js, Vite
- **Styling:** Pure Vanilla CSS (Custom Design System, Glassmorphism)
- **Routing:** React Router v6
- **Backend & Auth:** Firebase (Authentication, Firestore)
- **Icons:** Lucide React
- **Deployment:** Vercel

---

## 🚀 Run Locally

Want to run the project on your own machine? Follow these steps:

**1. Clone the repository**
```bash
git clone https://github.com/sujalks45/Hackathon-ab-talks.git
cd Hackathon-ab-talks
```

**2. Install dependencies**
```bash
npm install
```
*(Note: If you encounter peer dependency errors, run `npm install --legacy-peer-deps`)*

**3. Set up Environment Variables**
Create a `.env.local` file in the root directory and add your Firebase config:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**4. Start the development server**
```bash
npm run dev
```

---

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (Header, BottomNav, Badges, etc.)
├── contexts/         # React Context providers (AuthContext)
├── data/             # Mock JSON data for fallback challenges
├── lib/              # Utility configurations (firebase.js)
├── pages/            # Main route views (Landing, Dashboard, Profile, ChallengeDay)
├── App.jsx           # Application routing and wrapper
└── index.css         # Global design system and tokens
```

---

## 🤝 Contributing
This project was built for a hackathon. Feel free to fork the repository, open issues, and submit pull requests if you'd like to improve the platform!
