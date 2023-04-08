import './css/style.css'

import FullGoals from './model/fullList'
import ListTemplate from './template/goalTemplate'
import GoalElement from './model/listItem'

const initApp = (): void => {

    const fullList = FullGoals.instance
    const template = ListTemplate.instance

    // Add listener to new entry form submit
    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement

    itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault() 
        
        // get input text
        let input = document.getElementById("newItem") as HTMLInputElement
        const newInputText = input.value.trim()

        if(!newInputText.length)
            return
        
        input.value = ""

        // calculate goal priority
        const itemPriority = fullList.goalList.length ? fullList.goalList[fullList.goalList.length - 1].priority + 1 : 1

        // making new goal element
        const newGoal: GoalElement = new GoalElement(itemPriority.toString(), newInputText)

        // add goal to fullList
        fullList.addGoal(newGoal)

        template.render(fullList)
    })

    // Add listener to "Clear" button
    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement

    clearItems.addEventListener('click', (): void => {
        fullList.clearGoalList()
        template.clear()
    })

    // even if no event occured, still need to load goallist from local storage and render it
    // load initial data
    fullList.loadGoalList()
    // initial render of template
    template.render(fullList)

}

document.addEventListener('DOMContentLoaded', initApp)