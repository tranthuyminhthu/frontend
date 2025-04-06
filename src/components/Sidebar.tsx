import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from '@mui/material';
import { ListItemButton } from '@mui/material';
import {
  Book,
  Share,
  Visibility,
  TrendingUp,
  Assignment,
  PlayCircle,
  SettingsApplications,
  DesktopWindows,
  BugReport,
  ListAlt,
  Flag,
  Settings,
  ExpandMore,
  ExpandLess,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const [isTestsOpen, setIsTestsOpen] = useState(true);
  const [isExecutionOpen, setIsExecutionOpen] = useState(true);
  const [isIssuesOpen, setIsIssuesOpen] = useState(true);
  const [isRequirementsOpen, setIsRequirementsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <List>
        {/* Section: TESTS */}
        {!isCollapsed && (
          <ListItem
            onClick={() => setIsTestsOpen(!isTestsOpen)}
            className="sidebar-section-title"
          >
            <ListItemText primary="TESTS" />
            {isTestsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        )}
        <Collapse in={isTestsOpen && !isCollapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton selected className="sidebar-item">
              <ListItemIcon>
                <Book className="sidebar-icon selected" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Repository" className="selected" />}
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <Share className="sidebar-icon" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Shared Steps" />}
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <Visibility className="sidebar-icon" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Review" />}
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <TrendingUp className="sidebar-icon" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Traceability Reports" />}
            </ListItemButton>
          </List>
        </Collapse>
        {isCollapsed && (
          <List component="div" disablePadding>
            <ListItemButton selected className="sidebar-item">
              <ListItemIcon>
                <Book className="sidebar-icon selected" />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <Share className="sidebar-icon" />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <Visibility className="sidebar-icon" />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <TrendingUp className="sidebar-icon" />
              </ListItemIcon>
            </ListItemButton>
          </List>
        )}
        {!isCollapsed && <Divider />}

        {/* Section: EXECUTION */}
        {!isCollapsed && (
          <ListItem
            onClick={() => setIsExecutionOpen(!isExecutionOpen)}
            className="sidebar-section-title"
          >
            <ListItemText primary="EXECUTION" />
            {isExecutionOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        )}
        <Collapse in={isExecutionOpen && !isCollapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <Assignment className="sidebar-icon" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Test Plans" />}
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <PlayCircle className="sidebar-icon" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Test Runs" />}
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <SettingsApplications className="sidebar-icon" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Configurations" />}
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <DesktopWindows className="sidebar-icon" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Environments" />}
            </ListItemButton>
          </List>
        </Collapse>
        {isCollapsed && (
          <List component="div" disablePadding>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <Assignment className="sidebar-icon" />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <PlayCircle className="sidebar-icon" />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <SettingsApplications className="sidebar-icon" />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <DesktopWindows className="sidebar-icon" />
              </ListItemIcon>
            </ListItemButton>
          </List>
        )}
        {!isCollapsed && <Divider />}

        {/* Section: ISSUES */}
        {!isCollapsed && (
          <ListItem
            onClick={() => setIsIssuesOpen(!isIssuesOpen)}
            className="sidebar-section-title"
          >
            <ListItemText primary="ISSUES" />
            {isIssuesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        )}
        <Collapse in={isIssuesOpen && !isCollapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <BugReport className="sidebar-icon" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Defects" />}
            </ListItemButton>
          </List>
        </Collapse>
        {isCollapsed && (
          <List component="div" disablePadding>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <BugReport className="sidebar-icon" />
              </ListItemIcon>
            </ListItemButton>
          </List>
        )}
        {!isCollapsed && <Divider />}

        {/* Section: REQUIREMENTS */}
        {!isCollapsed && (
          <ListItem
            onClick={() => setIsRequirementsOpen(!isRequirementsOpen)}
            className="sidebar-section-title"
          >
            <ListItemText primary="REQUIREMENTS" />
            {isRequirementsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        )}
        <Collapse in={isRequirementsOpen && !isCollapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <ListAlt className="sidebar-icon" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Requirements" />}
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <Flag className="sidebar-icon" />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Milestones" />}
            </ListItemButton>
          </List>
        </Collapse>
        {isCollapsed && (
          <List component="div" disablePadding>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <ListAlt className="sidebar-icon" />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                <Flag className="sidebar-icon" />
              </ListItemIcon>
            </ListItemButton>
          </List>
        )}
        {!isCollapsed && <Divider />}

        {/* Section: SETTINGS */}
        {!isCollapsed && (
          <ListItem className="sidebar-section-title">
            <ListItemText primary="SETTINGS" />
          </ListItem>
        )}
        <ListItemButton className="sidebar-item">
          <ListItemIcon>
            <Settings className="sidebar-icon" />
          </ListItemIcon>
          {!isCollapsed && <ListItemText primary="Settings" />}
        </ListItemButton>
      </List>

      {/* Collapse submenu */}
      <div className="collapse-submenu" onClick={toggleCollapse}>
        {isCollapsed ? (
          <ChevronRight className="collapse-icon" />
        ) : (
          <ChevronLeft className="collapse-icon" />
        )}
        {!isCollapsed && (
          <span>{isCollapsed ? 'Expand sidebar' : 'Collapse submenu'}</span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;