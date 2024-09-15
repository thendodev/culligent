import {
  BookOpenText,
  LayoutDashboard,
  Library,
  LucideBriefcase,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import './sidebar.css';
import { ProjectRoutes } from '@/global/routes';

const SideBar = () => {
  return (
    <div className="sidebar border-[var(--cruto-black)] close">
      <ul id="nav-link" className="nav-links close">
        <li>
          <div id="icon-link" className="icon-link">
            <LayoutDashboard className="text-[color:var(--cruto-white)] m-auto w-[40px] h-[30px]" />
          </div>
          <ul id="sub-menu" className="sub-menu">
            <li>
              <Link
                href={`/${ProjectRoutes.recruitment}/${ProjectRoutes.dashboard}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={`/${ProjectRoutes.recruitment}/${ProjectRoutes.teams}`}
              >
                Teams
              </Link>
            </li>
            <li>
              <Link
                href={`/${ProjectRoutes.recruitment}/${ProjectRoutes.profile}`}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href={`/${ProjectRoutes.recruitment}/${ProjectRoutes.account}`}
              >
                Account
              </Link>
            </li>
            <li>
              <Link
                href={`/${ProjectRoutes.recruitment}/${ProjectRoutes.settings}`}
              >
                Settings
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <div id="icon-link-2" className="icon-link">
            <Library className="text-[color:var(--cruto-white)] m-auto w-[40px] h-[30px]" />
          </div>
          <ul id="sub-menu" className="sub-menu">
            <li>
              <Link
                href={`/${ProjectRoutes.recruitment}/${ProjectRoutes.case_builder}`}
              >
                Create Case
              </Link>
            </li>
            <li>
              <Link
                href={`/${ProjectRoutes.recruitment}/${ProjectRoutes.cases}`}
              >
                Cases
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <div id="icon-link-2" className="icon-link">
            <LucideBriefcase className="text-[color:var(--cruto-white)] m-auto w-[40px] h-[30px]" />
          </div>
          <ul id="sub-menu" className="sub-menu">
            <li>
              <Link
                href={`/${ProjectRoutes.recruitment}/${ProjectRoutes.post}`}
              >
                Create Post
              </Link>
            </li>
            <li>
              <Link
                href={`/${ProjectRoutes.recruitment}/${ProjectRoutes.posts}`}
              >
                Posts
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <div id="link-icon-3" className="icon-link">
            <BookOpenText className="text-[color:var(--cruto-white)] m-auto w-[40px] h-[30px]" />
          </div>
          <ul id="sub-menu-2" className="sub-menu">
            <li>
              <Link href="recruitment/dashboard">Case Report</Link>
            </li>
            <li>
              <Link href="">Recruit Reports</Link>
            </li>
            <li>
              <Link href="">Skills Reports</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
