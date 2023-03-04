class ExternalServices {
    async loginRequest(creds) {
      const response = await fetch('http://server-nodejs.cit.byui.edu:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const result = await response.json();
      return result.token;
    }
  
    async checkout(cart, token) {
      const response = await fetch('http://server-nodejs.cit.byui.edu:3000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cart)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const result = await response.json();
      return result.orderId;
    }
  
    async getOrders(token) {
      const response = await fetch('http://server-nodejs.cit.byui.edu:3000/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const orders = await response.json();
      return orders;
    }
  }
  
  class Admin {
    constructor(outputSelector) {
      this.mainElement = document.querySelector(outputSelector);
      this.token = null;
      this.services = new ExternalServices();
    }
  
    async login(creds, next) {
      try {
        this.token = await this.services.loginRequest(creds);
        next();
      } catch (error) {
        alertMessage(error.message);
      }
    }
  
    async getOrders() {
      try {
        const orders = await this.services.getOrders(this.token);
        console.log(orders);
        // TODO: implement code to display orders
      } catch (error) {
        alertMessage(error.message);
      }
    }
  
    showLogin() {
      this.mainElement.innerHTML = `
        <form id="login-form">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          <br>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>
          <br>
          <button type="submit">Login</button>
        </form>
      `;
      const loginForm = document.querySelector('#login-form');
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        this.login({ email, password }, async () => {
          console.log('Login successful!');
          await this.getOrders();
        });
      });
    }
  }
  
  export default Admin;
  