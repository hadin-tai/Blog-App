export class AuthService{

    async createAccount ({email, password, name}){
        try {
            
            const response = await fetch(`http://localhost/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    fullName:name
                })
            });
            
            
            if (!response.ok) {
                
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create account");
            }
            
            
            const data = await response.json();
            
            

            
            return data;

        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
      try {
        const response = await fetch('http://localhost/user/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({ email, password }),
          
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Login failed');
        }

        
        const data = await response.json();
        

        return data; 

      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    }

    async getCurrentUser() {
      try {
        const response = await fetch('http://localhost/user/getUser', {
          method: 'GET',
          credentials: 'include', 
        });

        if (!response.ok) {
          return null; 
        }

        const user = await response.json();
        
        return user;

      } catch (error) {
        console.error('Error getting current user:', error);
        return null;
      }
    }
    
    async logout() {
      try {
        const response = await fetch('http://localhost/user/logout', {
          method: 'GET',
          credentials: 'include', 
        });

        if (!response.ok) {
          throw new Error('Failed to logout');
        }

        const result = await response.json();
        

        return true; 

      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    }


}
const authService = new AuthService();

export default authService; 
