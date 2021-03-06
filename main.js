var DecisionTree = require("@ianwalter/decision-tree")
const decisionTree = new DecisionTree({
  key: 'attribute',
  title: 'What is your greatest attribute?',
  options: [
    {
      key: 'S',
      label: 'Strength',
      leadsTo: 'proficiency'
    },
    {
      key: 'I',
      label: 'Intelligence',
      leadsTo: 'spells'
    },
    {
      key: 'D',
      label: 'Dexterity',
      leadsTo: 'proficiency'
    },
    {
      key: 'C',
      label: 'Charisma',
      leadsTo: 'bard'
    }
  ],
  children: [
    {
      key: 'spells',
      title: 'What are your preffered type of spells?',
      options: [
        {
          key: 'damage',
          label: 'Damage',
          leadsTo: 'mage'
        },
        {
          key: 'healing',
          label: 'Healing',
          leadsTo: 'cleric'
        }
      ],
      children: [
        {
          key: 'mage',
          title: 'Mage',
          description: `
            You are a powerful mage, hurling fireballs at your foes!
          `
        },
        {
          key: 'cleric',
          title: 'Cleric',
          description: `
            You are a knowledgeable cleric, saving your friends by casting
            spells to heal them.
          `
        }
      ]
    },
    {
      key: 'proficiency',
      title: 'What type of weapon are you most proficient with?',
      options: [
        {
          key: 'swords',
          label: 'Swords',
          leadsTo: dt => {
            if (dt.state.attribute === 'D') {
              return 'thief'
            } else {
              return 'fighter'
            }
          }
        },
        {
          key: 'bows',
          label: 'Bows',
          leadsTo: 'ranger'
        }
      ],
      children: [
        {
          key: 'fighter',
          title: 'Fighter',
          description: `
            You are a strong fighter, using your sword to cut down those who
            stand in your way!
          `
        },
        {
          key: 'thief',
          title: 'Thief',
          description: `
            You are a dexterous thief, piercing enemies before they even
            know what hit them.
          `
        },
        {
          key: 'ranger',
          title: 'Ranger',
          description: `
            You are a skilled ranger, felling combatants with your arrows.
          `
        }
      ]
    },
    {
      key: 'bard',
      title: 'Bard',
      description: `
        You are a talented bard, inspiring your party with heroic ballads.
      `
    }
  ]
})

decisionTree.set('attribute', 'D').next()
decisionTree.set('proficiency', 'swords').next()
var result = decisionTree.current();
console.log(result)
