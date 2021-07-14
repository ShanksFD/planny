# Planny
Simple react app to help you manage your projects

## Installation

``` bash
$ npm i 
```

- **You can fetch** files from firebase

> ⚠️ Create your custom firebase app and add your config infos to firebase.js

```js
var config = {
   apiKey: "AIzaSyCjG07Ox1WQ4QUohYRiHhE-F7Cm41HUlUE",
   authDomain: "planny-dd778.firebaseapp.com",
   projectId: "planny-dd778",
   storageBucket: "planny-dd778.appspot.com",
   messagingSenderId: "548318476925",
   appId: "1:548318476925:web:cb17179a3bfc5952d24f14"
};
```

## Screenshots

The Project Manager's Screen , the manager is allowed to update the projects that he directs by dividung them into phases while indicating the phases informations such as " Label , Description , Employee , Start Date , End Date and the Price " . 
<img src="https://github.com/ShanksFD/planny/blob/master/screenshots/PhasesScreen.PNG">

The Administrator's Screen , the admin has the possibility to add , update and delete a user while indicating the user's profession " Administartor , Project Manager , Secretary ... " .
<img src="https://github.com/ShanksFD/planny/blob/master/screenshots/AdminScreen.PNG">

The Director's Screen , the director has only the option to update all the project's informations specialy the price and the project manager . 
<img src="https://github.com/ShanksFD/planny/blob/master/screenshots/DirectorScreen.PNG">

This Screen displays a project's phases with all the necessary informations , and a button " Mark As Done " for the project manager to use when a phase is completed .
<img src="https://github.com/ShanksFD/planny/blob/master/screenshots/Phases.PNG">

New Phase Screen , is where the project manager upload a neww project phase with all the informations shown in the form .
<img src="https://github.com/ShanksFD/planny/blob/master/screenshots/NewPhase.PNG">

New Project Screen , is a screen accessed by the secretary with an objectif to add a new project "informations included" to the company's data base .
<img src="https://github.com/ShanksFD/planny/blob/master/screenshots/NewProjectScreen.PNG">

Pop ups : 

The pop ups below were used for the editing and deletes parts of the project to display it to the user on top of the screen pages without redirections to other pages.

<img src="https://github.com/ShanksFD/planny/blob/master/screenshots/AdminEdit.PNG">
<img src="https://github.com/ShanksFD/planny/blob/master/screenshots/DirectorEdit.PNG">
<img src="https://github.com/ShanksFD/planny/blob/master/screenshots/DirectorDelete.PNG">




