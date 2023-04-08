import GoalElement from "./listItem";

export interface fullGoalList{
    goalList: GoalElement[],
    addGoal(goal: GoalElement): void,
    deleteGoal(priority: string): void,
    saveGoalList(): void,
    loadGoalList(): void,
    clearGoalList(): void,
}

export default class FullGoals implements fullGoalList{
     static instance: FullGoals = new FullGoals();

     private constructor(private _goalList: GoalElement[] = []) {}

     get goalList(): GoalElement[]{
         return this._goalList;
     }

     addGoal(goal: GoalElement): void{
        this._goalList.push(goal);
        this.saveGoalList();
     }

     deleteGoal(priority: string): void {
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
         const newGoalList : {_priority: string, _goal: string, _completed: boolean}[] = JSON.parse(goals);
         /// whyy not GoalElement[] ???? as it was stored as string and then parsed back so it wont have all the attributes of class object again, ab it will be simple object type
         // ofc stringify krne k baad revert back hoke wont be an class type
         // why _ ? as when saved it was of type GoalElement and usk keys will be of _ type
         // also cant use interface[] as wahan there is no _, so had to create new object type

         /// convert to GoalElement type and save so that browser can parse it

         newGoalList.forEach((goal) => {
            const newGoal: GoalElement =  new GoalElement(goal._priority, goal._goal, goal._completed);
            this.addGoal(newGoal);
         })
     }

     clearGoalList(): void {
         this._goalList = [];
         this.saveGoalList();
     }

}