var commands = [
  {
    name: "help",
    description: "Please try typing the following",
    sub_description: "<ul><li>define</li><li>wiki</li></urll>",
    example:""
  },{
    name: "define",
    description: "Finds google-dictionary meaning of the word mentioned next",
    sub_description: "Uses http://google-dictionary.so8848.com",
    example:"define browser"
  },{
    name: "wiki",
    description: "Searches wikipedia for the mentioned topic",
    sub_description: "uses www.wikipedia.org , If found it directly displays the initial few paragraphs of the topic",
    example:"wiki browser"
  },{
    name: "notess", //multiple keywords: scratch, note, notepad
    description: "Opens a quick notepad wherein you can save data",
    sub_description: "",
    example:""
  },{
    name: "reminder", //multiple keywords: remind, reminders, reminder
    description: "Opens your reminders if you have set any",
    sub_description: "",
    example:""
  },{
    name: "settings", //options , settings, preferences
    description: "Opens the settings page where you can customize",
    sub_description: "",
    example:""
  },{
    name: "quote", //quote
    description: "Fetches the quote of the day",
    sub_description: "",
    example:""
  }
];
