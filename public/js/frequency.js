const freqInput = new AutoNumeric('#freq-input', {
    digitGroupSeparator: '.',
    decimalCharacter: ',',
    modifyValueOnWheel: true,
    wheelStep: 10,
    minimumValue: 7000,
    maximumValue: 7200,
    defaultValueOverride: 7000,
    decimalPlaces: 0
  });
  freqInput.rawValue = 7000;
  
  let bandInput = document.querySelector("#band-input");
  console.log(bandInput);
  bandInput.addEventListener("change", (e) => {
    switch (e.target.value) {
      case "80m": 
        freqInput.rawValue = "3500";
        freqInput.settings.minimumValue = 3500;
        freqInput.settings.maximumValue = 3800;
        break;
      case "40m": 
        freqInput.rawValue = "7000";
        freqInput.settings.minimumValue = 7000;
        freqInput.settings.maximumValue = 7200;
        break;
      case "30m": 
        freqInput.rawValue = "10100";
        freqInput.settings.minimumValue = 10100;
        freqInput.settings.maximumValue = 10150;
        break;
      case "20m": 
        freqInput.rawValue = "14000";
        freqInput.settings.minimumValue = 14000;
        freqInput.settings.maximumValue = 14350;
        break;
      case "17m": 
        freqInput.rawValue = "18068";
        freqInput.settings.minimumValue = 18068;
        freqInput.settings.maximumValue = 18168;
        break;
      case "15m": 
        freqInput.rawValue = "21000";
        freqInput.settings.minimumValue = 21000;
        freqInput.settings.maximumValue = 21450;
        break;
      case "12m": 
        freqInput.rawValue = "24890";
        freqInput.settings.minimumValue = 24890;
        freqInput.settings.maximumValue = 24990;
        break;
      case "10m": 
        freqInput.rawValue = "28000";
        freqInput.settings.minimumValue = 28000;
        freqInput.settings.maximumValue = 29700;
        break;
      default:
        break;
    }
  })