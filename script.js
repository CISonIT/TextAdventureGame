const textElement = document.getElementById('text');
const optionsButtons = document.getElementById('options-buttons');

let state = {}

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionsButtons.firstChild) {
    optionsButtons.removeChild(optionsButtons.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerHTML = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button);
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <- 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "You wake up in a strange place and you see a jar of blue goo near you",
    options: [
        {
          text: "Take goo",
          setState: { blueGoo: true},
          nextText: 2
        },
        {
          text: "Leave the goo",
        },
        {
          text: "Leave the goo",
        }
    ]
  },
  {
    id: 2,
    text: "You venture forth in search of answers to where you are when you come across a merchant",
    options: [
      {
        text: "Trade a goo for a sword",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true},
        nextText: 3
      },
      {
        text: "Trade a goo for a shield",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true},
        nextText: 3
      },
      {
        text: "Ignore a merchant",
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: "After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle",
    options: [
      {
        text: "Explore the castle",
        nextText: 4
      },
      {
        text: "Find a room to sleep at in the town",
        nextText: 5
      },
      {
        text: "Find some hay in a stable to sleep in",
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: "You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  }
]

startGame();