import { Routes, Route } from "react-router-dom";

// Components
import LandingPage from "./components/LandingPage/LandingPage";
import Signup from "./components/Signup";
import Login from "./components/Login";

// Main Pages
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import CalendarPage from "./pages/CalendarPage";
import Analytics from "./pages/Analytics";
import ReflectionBox from "./pages/ReflectionBox";
import Feedback from "./pages/Feedback";
import Doctor from "./pages/Doctor";
import EmergencyHelpline from "./pages/EmergencyHelpline";
import WellnessBuddy from "./pages/WellnessBuddy";
import StressCheck from "./pages/StressCheck";
import Relaxation from "./pages/Relaxation";
import CommunityWall from "./pages/CommunityWall";
import DailyMoodTracker from "./pages/DailyMoodTracker";
import Help from "./pages/Help";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageAppointments from "./pages/ManageAppointments";
import CommunityForum from "./pages/CommunityForum";
import ForumModeration from "./pages/ForumModeration";
import FeedbackInbox from "./pages/FeedbackInbox";
import AdminAccount from "./pages/AdminAccount";

// Counsellor Pages
import CounsellorDashboard from "./pages/CounsellorDashboard";
import CounsellorAppointments from "./pages/CounsellorAppointments";
import CounsellorCommunityWall from "./pages/CounsellorCommunityWall";
import CounsellorAccount from "./pages/CounsellorAccount";

// Volunteer Pages
import VolunteerDashboard from "./pages/VolunteerDashboard";
import VolunteerCommunityChat from "./pages/VolunteerCommunityChat";
import VolunteerAccount from "./pages/VolunteerAccount";

function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* User Pages */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/account" element={<Account />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/reflection" element={<ReflectionBox />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/emergency-helpline" element={<EmergencyHelpline />} />
      <Route path="/wellness-buddy" element={<WellnessBuddy />} />
      <Route path="/stress-check" element={<StressCheck />} />
      <Route path="/relaxation" element={<Relaxation />} />
      <Route path="/community-wall" element={<CommunityWall />} />
      <Route path="/daily-mood-tracker" element={<DailyMoodTracker />} />
      <Route path="/help" element={<Help />} />

      {/* Admin */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/manage-appointments" element={<ManageAppointments />} />
      <Route path="/community-forum" element={<CommunityForum />} />
      <Route path="/forum-moderation" element={<ForumModeration />} />
      <Route path="/feedback-inbox" element={<FeedbackInbox />} />
      <Route path="/admin-account" element={<AdminAccount />} />

      {/* Counsellor */}
      <Route
        path="/counsellor-dashboard"
        element={<CounsellorDashboard />}
      />
      <Route
        path="/counsellor-appointments"
        element={<CounsellorAppointments />}
      />
      <Route
        path="/counsellor-community-wall"
        element={<CounsellorCommunityWall />}
      />
      <Route
        path="/counsellor-account"
        element={<CounsellorAccount />}
      />

      {/* Volunteer */}
      <Route
        path="/volunteer-dashboard"
        element={<VolunteerDashboard />}
      />
      <Route
        path="/volunteer-community-chat"
        element={<VolunteerCommunityChat />}
      />
      <Route
        path="/volunteer-account"
        element={<VolunteerAccount />}
      />
    </Routes>
  );
}

export default App;
