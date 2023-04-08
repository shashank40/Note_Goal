import FullGoals from '../model/fullList';

export interface DOMList{
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullGoals): void,
}

export default class ListTemplate implements DOMList{
    ul: HTMLUListElement;

    static instance: ListTemplate = new ListTemplate();

    private constructor(){
        this.ul =  document.getElementById("listItems") as HTMLUListElement;
    }

    clear(): void{
        this.ul.innerHTML = "";
    }
    render(fullGoals: FullGoals): void {
        this.clear();

        fullGoals.goalList.forEach(goal => {
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item"

            const check = document.createElement("input") as HTMLInputElement
            check.type = "checkbox"
            check.id = goal.priority
            check.checked = goal.completed
            li.append(check)

            check.addEventListener('change', () => {
                goal.completed = !goal.completed
                fullGoals.saveGoalList()
            })

            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = goal.priority
            label.textContent = goal.goal
            li.append(label)

            const button = document.createElement("button") as HTMLButtonElement
            button.className = 'button'
            button.textContent = 'X'
            li.append(button)

            button.addEventListener('click', () => {
                fullGoals.deleteGoal(goal.priority)
                this.render(fullGoals)
            })

            this.ul.append(li)
        })
    }
}