// $(document).ready(function () {
//     $('#file_input').on('change', function (e) {

//         function updateProgress(evt) {
//             if (evt.lengthComputable) {
//                 // evt.loaded and evt.total are ProgressEvent properties
//                 var loaded = (evt.loaded / evt.total);
//                 if (loaded < 1) {
//                     // Increase the prog bar length
//                     style.width = (loaded * 200) + "px";
//                 }
//             }
//         }

//         function loaded(evt) {
//             // Obtain the read file data    
//             var fileString = evt.target.result;
//             // Handle UTF-16 file dump
//             $('#output_field').text(fileString);
//         }
//         var res = readFile(this.files[0]);

//         var reader = new FileReader();

//         reader.readAsText(this.files[0], "UTF-8");

//         reader.onprogress = updateProgress;
//         reader.onload = loaded;


//     });
// });

function readNPFile(file) {
    var reader = new FileReader(),
        result = 'empty';

    reader.onload = function (e) {
        result = JSON.parse(e.target.result);
        // console.log(result);
        document.NP.ATK.value = result["ATK"];
        document.NP.NPmu.value = result["NPmagnification"];
        document.NP.card.value = result["NPcard"];
        document.NP.CARDbuff.value = result[document.NP.card.value + "CARDbuff"];
        document.NP.class2.value = result["class"];
        document.NP.ATKbuff.value = result["ATKbuff"];
        document.NP.DEFdebuff.value = result["DEFdebuff"];
        document.NP.CARDdebuff.value = result[document.NP.card.value + "CARDdebuff"];
        document.NP.sATKbuff.value = result["spATKbuff"];
        document.NP.sDEFdebuff.value = result["spDEFdebuff"];
        document.NP.NPbuff.value = result["NPbuff"];
        document.NP.sNPbuff1.value = result["spNPbuff1"];
        document.NP.sNPbuff2.value = result["spNPbuff2"];
    };

    reader.readAsText(file);

    return result;
}
