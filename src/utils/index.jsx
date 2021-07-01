
export const isLogin = () => {
   if(localStorage.getItem("userInfo"))
      return true
   return false
} 

export const userPerm = () => {
   if(isLogin)
   {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))
      return (userInfo.is_admin ? "Director"
      : userInfo.is_accountingManager ? "Accounting Manager" 
      : userInfo.is_projectManager ? "Project Manager" 
      : userInfo.is_secretary ? "Secretary"
      : "Root");
   }
   return 
}