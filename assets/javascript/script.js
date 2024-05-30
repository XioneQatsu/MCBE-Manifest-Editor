
document.querySelector("#content-load").innerHTML = `
<div class="card-column-1">
  <div class="card radius-all box-shadow">
    <div class="card-text radius-tlr">
      <h3 class="font-color">MCBE Manifest Editor</h3>
    </div>
    <div class="card-text font-color" id="inputContent">
      <input type="file" accept="application/json,.json" id="inputJSON">
    </div>
  </div>
</div>
`;

document.getElementById('inputJSON').onchange = data => {
  fetch(URL.createObjectURL(data.target.files[0]))
  .then(res => res.json())
  .then(data => {
    let header = data.header,
      dependencies = data.dependencies/*,
      modules = data.modules*/;

    let contentInner = `
    <table><tbody>
      <tr><td>Name</td><td>:  <input type="text" class="input-text font-color" value="${header.name}" id="name"></td></tr>
      <tr><td>Description</td><td>:  <input type="text" class="input-text font-color" value="${header.description}" id="description"></td></tr>
      <tr><td>UUID</td><td>:  <input type="text" class="input-text font-color" value="${header.uuid}" id="uuid"></td></tr>
      <tr><td>Version</td><td>:  <input type="text" class="input-version font-color" value="${header.version[0]}" pattern="[0-9]*" maxlength="3" id="version1"> <input type="text" class="input-version font-color" value="${header.version[1]}" pattern="[0-9]*" maxlength="3" id="version2"> <input type="text" class="input-version font-color" value="${header.version[2]}" pattern="[0-9]*" maxlength="3" id="version3"></td></tr>
      <tr><td>Min engine version</td><td>:  <input type="text" class="input-version font-color" value="${header.min_engine_version[0]}" pattern="[0-9]*" maxlength="3" id="mcVersion1"> <input type="text" class="input-version font-color" value="${header.min_engine_version[1]}" pattern="[0-9]*" maxlength="3" id="mcVersion2"> <input type="text" class="input-version font-color" value="${header.min_engine_version[2]}" pattern="[0-9]*" maxlength="3" id="mcVersion3"></td></tr>
      ${dependencies ? `<tr><td><br></td></tr><tr><td>Dependencies</td></tr>
      <tr><td>UUID</td><td>:  <input type="text" class="input-text font-color" value="${dependencies.uuid}" id="dpUUID"></td></tr>
      <tr><td>Version</td><td>:  <input type="text" class="input-version font-color" value="${dependencies.version[0]}" pattern="[0-9]*" maxlength="3" id="dpVersion1"> <input type="text" class="input-version font-color" value="${dependencies.version[1]}" pattern="[0-9]*" maxlength="3" id="dpVersion2"> <input type="text" class="input-version font-color" value="${dependencies.version[2]}" pattern="[0-9]*" maxlength="3" id="dpVersion3"></td></tr>
      ` : ``}
    </tbody></table>`;

    document.getElementById('inputContent').innerHTML = contentInner;
    document.getElementById('inputContent').outerHTML += `<br><button class="card-btn font-color" id="saveAsFile">Save as file "manifest.json"</button>`;

    document.getElementById('saveAsFile').onclick = () => {
      header.name = document.getElementById('name').value;
      header.description = document.getElementById('description').value;
      header.uuid = document.getElementById('uuid').value;
      header.version = JSON.parse('[' + document.getElementById('version1').value + ', ' + document.getElementById('version2').value + ', ' + document.getElementById('version3').value + ']');
      header.min_engine_version = JSON.parse('[' + document.getElementById('mcVersion1').value + ', ' + document.getElementById('mcVersion2').value + ', ' + document.getElementById('mcVersion3').value + ']');
      if (dependencies) {
        dependencies.uuid = document.getElementById('dpUUID').value;
        dependencies.version = JSON.parse('[' + document.getElementById('dpVersion1').value + ', ' + document.getElementById('dpVersion2').value + ', ' + document.getElementById('dpVersion3').value + ']');
      }
      let textContent = document.createElement("textarea");
      textContent.value = JSON.stringify(data);
      let linkContent = document.createElement('a');
      let fileContent = new Blob([textContent.value], { type: 'text/plain' });
        linkContent.href = URL.createObjectURL(fileContent);
        linkContent.download = 'manifest.json';
        linkContent.click();
      URL.revokeObjectURL(linkContent.href);
    }
  })
  .catch()
}