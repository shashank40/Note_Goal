export interface goal {
    priority: number,
    goal: string,
    completed: boolean,
}

/// important point to note, when using getter and setter, you need to use the get and set keyword
/// getter setters mainly have same name as the property and so property name cannot be equal to the getter setter name
/// so the property name will start with an underscore as a convention, the class will understand itself that we are implementing
/// the property correctly as in the interface but with a _ in front of it
// so we also need to give some default values so that check that yes _priority and priority are same

export default class goalElement implements goal{

    constructor(private _priority: number = 0,
                private _goal: string = "",
                private _completed: boolean = false) {}

    get priority(): number {
        return this._priority;
    }
    
    set priority(priority: number){
        this._priority = priority;
    }

    get goal(): string {
        return this._goal;
    }
    
    set goal(goal: string){
        this._goal = goal;
    }

    get completed(): boolean {
        return this._completed;
    }
    
    set completed(completed: boolean){
        this._completed = completed;
    }
}