import userRoles from "../utils/userRoles";
export const  menu = {
  [userRoles.faculty]: [
    {
      "routeName": "Dashboard",
      "endpoint": "/dashboard",
      "icon": "home"
    },
  ],
  [userRoles.admin]: [
    {
      "routeName": "Dashboard",
      "endpoint": "/dashboard",
      "icon": "home"
    },
    {
      "routeName": "Set Admins",
      "endpoint": "/set-admins",
      "icon": "account_box"
    },
    {
      "routeName": "View Overall Stats",
      "endpoint": "/admin-stats",
      "icon": "emoji_people"
    }
  ],
  [userRoles.general]: [
    {
      "routeName": "Home",
      "endpoint": "/home",
      "icon": "home"
    },
    {
      "routeName": "Profile",
      "endpoint": "/profile",
      "icon": "account_box"
    },
    {
      "routeName": "Search D-Spaces",
      "endpoint": "/search-d-spaces",
      "icon": "search"
    },
    {
      "routeName": "New Post",
      "endpoint": "/new-post",
      "icon": "post_add"
    },
    {
      "routeName": "New D-Space",
      "endpoint": "/new-dspace",
      "icon": "group_add"
    },
    {
      "routeName": "Your D-Spaces",
      "endpoint": "/user-dspaces",
      "icon": "view_day"
    },
    {
      "routeName": "Community",
      "endpoint": "/community",
      "icon": "emoji_people"
    }
  ],
  [userRoles.signedout]:[ 

  ], 
} 


