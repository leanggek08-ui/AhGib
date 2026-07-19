import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconUsers,
  IconHelpCircle,
  IconBuildingBank,
  IconSchool,
  IconBriefcase,
  IconAffiliate,
  IconTool,
  IconShieldStar,
  IconActivity,
  IconUserCog,
  IconLogout,
} from "@tabler/icons-react";
import { styles } from "../../styles/adminLayoutStyles";

function SidebarLink({ to, icon: Icon, children }) {
  const [hover, setHover] = useState(false);
  return (
    <NavLink
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={({ isActive }) => ({
        ...styles.menuItem,
        ...(hover && !isActive ? styles.menuItemHover : {}),
        ...(isActive ? styles.activeMenu : {}),
      })}
    >
      <span style={styles.menuIcon}>
        <Icon size={17} stroke={1.75} />
      </span>
      {children}
    </NavLink>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role_id;
  const isAdmin = role === 1;
  const isSuperAdmin = role === 3;
  const panelLabel = isSuperAdmin ? "Super Admin Panel" : isAdmin ? "Admin Panel" : "Student Panel";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={styles.sidebar}>
      <div>
        <div style={styles.logo}>AhGib</div>
        <div style={styles.logoSub}>{panelLabel}</div>

        <div style={styles.menu}>
          <SidebarLink
            to={isAdmin || isSuperAdmin ? "/admin/dashboard" : "/student/dashboard"}
            icon={IconLayoutDashboard}
          >
            Dashboard
          </SidebarLink>

          {(isAdmin || isSuperAdmin) && (
            <>
              <div style={styles.sectionLabel}>Manage</div>
              <SidebarLink to="/admin/users" icon={IconUsers}>Users</SidebarLink>
              <SidebarLink to="/admin/questions" icon={IconHelpCircle}>Questions</SidebarLink>
              <SidebarLink to="/admin/universities" icon={IconBuildingBank}>Manage universities</SidebarLink>
              <SidebarLink to="/admin/majors" icon={IconSchool}>Majors</SidebarLink>
              <SidebarLink to="/admin/careers" icon={IconBriefcase}>Careers</SidebarLink>
              <SidebarLink to="/admin/university-majors" icon={IconAffiliate}>University majors</SidebarLink>
              <SidebarLink to="/admin/career-skills" icon={IconTool}>Career skills</SidebarLink>
              <SidebarLink to="/admin/major-careers" icon={IconAffiliate}>Major Career</SidebarLink>
            </>
          )}

          {isSuperAdmin && (
            <>
              <div style={styles.sectionLabel}>Super admin</div>
              <SidebarLink to="/admin/super" icon={IconShieldStar}>Super admin</SidebarLink>
              <SidebarLink to="/admin/activity" icon={IconActivity}>Activity logs</SidebarLink>
              <SidebarLink to="/admin/super-users" icon={IconUserCog}>User management</SidebarLink>
            </>
          )}
        </div>
      </div>

      <div style={styles.sidebarFooter}>
        <div style={styles.divider} />
        <button onClick={logout} style={styles.logout}>
          <IconLogout size={16} stroke={1.75} />
          Logout
        </button>
      </div>
    </div>
  );
}