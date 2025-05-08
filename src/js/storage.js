export function placeInStorage(myList){
    const myListJSON = JSON.stringify(myList);
    localStorage.setItem("projects", myListJSON);

}

export function retrieveStorageList(){
    const storedListJSON = localStorage.getItem("projects");

    if (storedListJSON!==null){
        const storedList = JSON.parse(storedListJSON);
        return storedList
    }
    console.log(`No list found of name projects`);
    return
    
}

export function updateStorage(projects){
    //only changes the projects list in storage

    //clean storage to fill it in with the projects array, containing the project object instances
    localStorage.clear();

    //place projects list in storage
    placeInStorage(projects);

    //monitoring
    console.log("new storage projects list: ", retrieveStorageList());
}