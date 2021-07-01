export const ADMINISTRATOR_PERM = "Administrator"
export const DIRECTOR_PERM = "Director"
export const ACCOUNTING_MANGER_PERM = "Accounting Manager"
export const PROJECT_MANAGER_PERM = "Project Manager"
export const SECRETARY_PERM = "Secretary"
export const DEFAULT_PERM = "Root"

export const isLogin = () => {
   if(localStorage.getItem("userInfo"))
      return true
   return false
} 

export const userPerm = () => {
   if(isLogin())
   {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))
      return ( userInfo.is_admin ? ADMINISTRATOR_PERM
      : userInfo.is_director ? DIRECTOR_PERM
      : userInfo.is_accountingManager ? ACCOUNTING_MANGER_PERM
      : userInfo.is_projectManager ? PROJECT_MANAGER_PERM
      : userInfo.is_secretary ? SECRETARY_PERM
      : "Root");
   }
   return "Root"
}

export const currentPerm = userPerm();

export const isEligible = (permName) => {
   if(currentPerm === permName)
      return true;
   return false;
}