# AI Usage Log (ABTalks Redesign)

This document logs the AI-assisted workflow and prompt methodology used to build and redesign the ABTalks platform for the 60-Day Challenge Hackathon. The project was primarily built using an autonomous agentic AI coding assistant, following a "vibe-coded" approach where the AI managed the codebase while I directed the architecture, design goals, and feature requirements.

## 1. Initial Scaffold and Design System

**Goal:** Create a modern, mobile-first, glassmorphic UI matching the redesign prompt requirements.
**Approach:** I instructed the AI to set up a Vite + React project and implement a design system from scratch. I explicitly requested dark-mode aesthetics, specific color palettes, and glassmorphic container styles to ensure a premium feel without relying on generic component libraries.
**Prompts/Instructions:**
- "Initialize a Vite + React project. Use vanilla CSS for styling."
- "Implement a dark-mode, mobile-first (390px) glassmorphic design system in index.css."
- "Build the Landing Page (/) focusing on trust and motivation, including a CTA to start the challenge."
- "Build the Student Dashboard (/dashboard) with a streak counter, progress ring, and today's task."
- "Build the Challenge Day page (/day/12) with a submission form for GitHub and LinkedIn URLs."

## 2. Mock Data to Real Backend Transition

**Goal:** Evolve the prototype from static JSON data to a real production-ready backend.
**Approach:** While the rules permitted mock data, I opted to build a fully functional backend using Firebase to handle edge cases natively. I instructed the AI to integrate Firebase Authentication (Google Sign-in) and Cloud Firestore.
**Prompts/Instructions:**
- "Improve backend and add sign-in option. Tell me what things are required like keys of Firebase."
- "Create an AuthContext to handle Google Login."
- "Secure the /dashboard and /day/:dayNumber routes with a ProtectedRoute component."
- "When a user logs in, create a profile document in Firestore. When they submit a task, push a document to the submissions subcollection and increment their streak."

## 3. UX Polish and Edge Cases

**Goal:** Handle the edge cases specified in the hackathon rules and improve the overall tactile feel of the app.
**Approach:** I directed the AI to add specific components and states to handle edge cases like a new user (0 streak), a missed day, and empty achievements. I also requested UX improvements.
**Prompts/Instructions:**
- "Handle real-world edge cases: First day with no streak, a missed day, an empty profile."
- "Now you have tested it, improve its user experience."
- "Add a Toast notification system (react-hot-toast) for login and submissions."
- "Implement a ScrollToTop component so the SPA feels like a native app during route transitions."
- "Replace generic loading spinners with a branded full-page LoadingScreen while fetching Firebase data."

## 4. User Profile Integration

**Goal:** Allow users to manage their own settings and profile details natively within the app.
**Approach:** I instructed the AI to replace the generic logout button with a scalable user menu and build a dedicated Profile route.
**Prompts/Instructions:**
- "Add a 'see profile' and other options according to rules."
- "Update Header to include an avatar dropdown."
- "Create a Profile.jsx page where users can update their Display Name, College, and Challenge Track in Firestore."

---

**Summary:** The AI acted as a pair-programmer, executing complex state management, routing, and database integrations based on my high-level architectural directions and feature requests. The combination of Vite, React, and Firebase resulted in a robust, functional prototype that exceeds the baseline requirements.
