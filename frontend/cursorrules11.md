# Cursor Rules

## Project: Frontend for E-commerce Website

This project is a **frontend for an e-commerce website**, developed using react tailwind  web technologies. It provides an **interactive platform** for users to browse and purchase products while offering a **management dashboard** for administrators to handle products, users, and orders. The project is built with a focus on a **smooth and intuitive user experience**, with added functionalities for **searching, filtering, and managing products**.

### Basic Requirements  

#### Functionalities for a Visitor:  
- Get the **list of products**.  
- **Search products** by name.  
- **Filter products** by price.  
- Add products to a **cart**.  
- Remove products from a **cart**.  

#### Functionalities for an Admin:  
- Add a **new product**, update product information, remove a product.  

---

### Additional Requirements  

#### Authentication:  
- Implement **register and login** functionality via email and password.  
- **Protect routes** based on login and admin status.  

#### Admin-Specific Functionalities:  
- List all **users**, delete a user.  
- List all **orders**.  

#### General Features:  
- Display **loading, success, and error messages** (e.g., when loading the product list or adding a new product).  
- Implement a **pagination feature**.  

#### Profile Page:  
- Create a **Profile Page** (accessible only if the user logs in).  
- Implement **editing user profile functionality** (user can change first name and last name).  

---

## Rules for Creating React Components:

1. **Carefully consider** the component's purpose, functionality, and design.  
2. **Think slowly, step by step,** and outline your reasoning.  
3. **Check if a similar component already exists** in the following location:  
   - `frontend/src/components`  

4. **If it doesn't exist**, generate a detailed prompt for the component, including:  
   - **Component name and purpose**  
   - **Desired props and their types**  
   - **Any specific styling or behavior requirements**  
   - Mention **using Tailwind CSS** for styling.  
   - Request **JavaScript (.jsx) usage**.  

<!-- 5. **URL encode the prompt.**  
6. **Create a clickable link** in this format:  
   `[ComponentName](https://v0.dev/chat?q={encoded_prompt})`   -->

7. **After generating**, adapt the component to fit our project structure:  
   - **Import**:  
     - App-specific components from `<app_package_alias>@/components</app_package_alias>`.  
   - Ensure it **follows our existing component patterns**.  
   - Add any **necessary custom logic or state management**.  

---

<!-- ### Example Prompt Template:
> "Create a React component named `{ComponentName}` using JavaScript (.jsx) and Tailwind CSS.  
> It should {description of functionality}. Props should include {list of props with types}.  
> The component should {any specific styling or behavior notes}.  
> Please provide the full component code." -->

---

### Notes:  
- **Do not use any library components**; implement the component using **plain HTML** and **Tailwind CSS** only.  
- Replace placeholders like `<ui_package_path>` and `<app_package_alias>` with the **actual values** used in your project.