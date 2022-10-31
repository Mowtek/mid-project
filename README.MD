Student Name: שרון
Student Cycle Number (מספר מחזור): D130222ER
E-Mail: Mowsplace@gmail.com

## Welcome to Play!

This site was created as a mid-project for my Full-Stack class in HackerU. The project required my site to have some specific requirements, and I will walk you through all of them in this .md file.

**The specifications are as followed:**

1.  **Create at-least 3 separate Routed pages with React Router** - the site contains more than 3 routed pages, and some dynamically routed pages that are based on the info that the user wants to dive into. You can check the 'Shop' page, where each card of an Item is a NavLink which routes the user to the specified page of the item.

2.  **Have 2 layers of depth the user can dive into** - again I'll mention the use of the NavLink in the 'Shop' page, where I used arrays from the 'App.jsx' component and rendered the NavLinks based on them, and when a user clicks on one of the cards, he's being sent to the second layer which includes information sent from the NavLink itself using its 'state' prop. I wanted to also include descriptions in the arrays, which the user will only see on the 'Item' page, but sadly I ran out of time for the project.

3.  **The user should have the ability to Add, Update or Delete cards** - this can be achieved by pressing the "E" button on the cards to Edit them, "X" button to delete them, or the "+" button to add a new item, where you can update the Name, Price and even the Photo for the certain item. The "+" button doesn't work in the "All" category since the function was built on the premised that we'll get the specific category array to change by knowing which page the user is in, therefore "All" wouldn't work.
