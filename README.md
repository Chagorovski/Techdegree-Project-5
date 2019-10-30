# Tech Degree Project 5

## Public API Requests

- Using the [Random User Generator API](https://randomuser.me/) I have created an app for fictional company called Awesome Startup.
- This app contains two main functions 
    - The first one generates the main page HTML
    - The second one makes the modal window 
 
- This project contains a search field to filter the requestet employee for better UX
- I have added a toggle for back and forth between employees.
  
___
- I have made some changes in the CSS file, added some colors , made box-shadows.

```css
.modal p {
    color : purple;
}
```

```css
.modal {
    position: relative;
    width: 95%;
    max-width: 420px;
    min-height: 415px;
    margin: 10px auto auto;
    padding-bottom: 15px;
    font-style: italic;
    background: rgb(165, 169, 227);
    border-radius: 0.25em;
    /* added box shadow */
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.5), 0 7px 20px 0 rgba(0, 0, 0, 0.30); 
    border: 1px solid rgba(100, 100, 100, 0.226);
    transition: .4s ease-out;
}
```
