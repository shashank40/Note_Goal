import goalElement from "./listItem";

export interface fullGoalList{
    goalList: goalElement[],
    addGoal(goal: goalElement): void,
    deleteGoal(priority: number): void,
    saveGoalList(): void,
    loadGoalList(): void,
    clearGoalList(): void,
}

export default class fullGoals implements fullGoalList{
     static instance: fullGoals = new fullGoals();

     private constructor(private _goalList: goalElement[] = []) {}

     get goalList(): goalElement[]{
         return this._goalList;
     }

     addGoal(goal: goalElement): void{
        this._goalList.push(goal);
        this.saveGoalList();
     }

     deleteGoal(priority: number): void {
         this._goalList = this._goalList.filter((goal) => goal.priority !== priority);
     }

     saveGoalList(): void {
         localStorage.setItem("myGoals", JSON.stringify(this._goalList))
     }

     loadGoalList(): void { // point is localstorage is used so that we can save the data and when browser opens we call this fn. Rendering will be actually done by ListObject
        // take elements out 
        const goals: string | null = localStorage.getItem("myGoals");
         if(typeof goals !== "string"){
            return;
         }

         // parse elemets as array of objects
         const newGoalList : {_priority: number, _goal: string, _completed: boolean}[] = JSON.parse(goals);
         /// whyy not goalElement[] ???? as it was stored as string and then parsed back so it wont have all the attributes of class object again, ab it will be simple object type
         // ofc stringify krne k baad revert back hoke wont be an class type
         // why _ ? as when saved it was of type goalElement and usk keys will be of _ type
         // also cant use interface[] as wahan there is no _, so had to create new object type

         /// convert to goalElement type and save so that browser can parse it

         newGoalList.forEach((goal) => {
            const newGoal: goalElement =  new goalElement(goal._priority, goal._goal, goal._completed);
            this.addGoal(newGoal);
         })
     }

     clearGoalList(): void {
         this._goalList = [];
         this.saveGoalList();
     }

}