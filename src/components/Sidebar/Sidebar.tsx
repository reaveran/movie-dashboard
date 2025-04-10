import { useLocation, useNavigate } from "react-router-dom";
import { List } from "@material-tailwind/react";
import { Heart, HomeAlt } from "iconoir-react";

import fullLogo from "@/assets/images/png/full-logo.png";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      icon: HomeAlt,
      title: "Home",
      href: "/",
      testId: "menu-home",
    },
    {
      icon: Heart,
      title: "Favorites",
      href: "/favorites",
      testId: "menu-favorites",
    },
  ];
  return (
    <div>
      <div className="mx-4 mb-4 mt-3 h-max">
        <img src={fullLogo} alt="nature-image" className="w-24 md:w-32" />
      </div>
      <div className="">
        <List>
          {menus.map(({ icon: Icon, title, href, testId }) => {
            const isActive = location.pathname === href;
            return (
              <List.Item
                className={`px-4 cursor-pointer rounded-none 
                  ${isActive ? "text-orange-600" : ""}
                  hover:bg-orange-100 hover:text-orange-600`}
                key={title}
                onClick={() => navigate(href)}
                data-testid={testId}
              >
                <List.ItemStart>
                  <Icon className="h-[18px] w-[18px]" />
                </List.ItemStart>
                {title}
              </List.Item>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
