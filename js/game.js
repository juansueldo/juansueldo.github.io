
const $continue = document.getElementById("continue");
const $fight = document.getElementById("fight");
const $change = document.getElementById("change");
const $actions = document.getElementById("actions");
const $skills = document.getElementById("skills");
const $friends = document.getElementById("friends");
const $dialogueText = document.getElementById("dialogue-text");
const $dialogueTextCombat = document.getElementById("dialogue-text-combat");
const $playerHP = document.getElementById("player-hp");
const $opponentHP = document.getElementById("opponent-hp");
const $selector = document.getElementById("container-selector");
const $selectorclass= document.getElementById("classplayer");
const $inputcontainer= document.getElementById("container-input");
const $nameplayer= document.getElementById("name-player");
const $battlefield= document.getElementById("battlefield");
const $grid= document.getElementById("content-grid");
const $start= document.getElementById("character-start");
const $testBtn= document.getElementById("auto-complete");
const $endBattle = document.getElementById("end-battle");
const $endBattleBtn= document.getElementById("continue-end-battle");
const $escape = document.getElementById("scape");

let playerHP = 100;
let opponentHP = 100;
let isTyping = false;
let steps= 0;
let classplayer="";
let nameplayer="";


const battlefield = document.querySelector('.battlefield');

const childCount = battlefield.children.length;

if (childCount === 2) {
  battlefield.style.gridTemplateRows = '10fr 2fr';
} else {
  battlefield.style.gridTemplateRows = '2fr 2fr 1fr';
}

const friendList = [
    {  name: "Bautista", level: 1, hp: 20, max_hp: 20, sp_attack: 0, pp: 40, type: "",skills: [] },
    {  name: "Sebastian", level: 1, hp: 20, max_hp: 20, sp_attack: 0, pp: 40, type: "",skills: [] },
];

const skills =[
    { name: 'Zurdo empobrecedor', damage: 0, pp: 5, sp_attack: 10, type: 'derecha', subtype: 'derecha' },
    { name: 'Vos sos la dictadura', damage: 0, pp: 5, sp_attack: 10, type: 'izquierda', subtype: 'centro' },
    { name: 'Privatización', damage: 5, pp: 5, sp_attack: 10, type: 'derecha', subtype: 'derecha' },
    { name: 'Expropiación', damage: 5, pp: 5, sp_attack: 10, type: 'izquierda', subtype: 'centro' },
    { name: 'Fuerzas del cielo', damage: 10, pp: 10, sp_attack: 10, type: 'derecha', subtype: 'derecha' },
    { name: 'Nacional y popular', damage: 10, pp: 10, sp_attack: 10, type: 'centro', subtype: 'centro' },
    { name: 'Plus valia', damage: 10, pp: 10, sp_attack: 10, type: 'izquierda', subtype: 'izquierda' },
]

let player={ name: "", level: 1, hp: 20, exp: 0, max_exp: 20, max_hp: 20, sp_attack: 0, sp_defence: 0, pp: 40, type: "", skills: []};

let cpu;
// Array de enemigos con posiciones y datos
let enemies = [
    { name: 'Julian', level: 1, hp: 10, max_hp: 10, sp_attack: 0, pp: 40, type: 'derecha', skills: [], position: { x: 4, y: 4 } },
    { name: 'Lucia', level: 2, hp: 15, max_hp: 15, sp_attack: 5, pp: 30, type: 'izquierda', skills: [], position: { x: 6, y: 6 } },
    { name: 'Carlos', level: 3, hp: 20, max_hp: 20, sp_attack: 7, pp: 20, type: 'centro', skills: [], position: { x: 8, y: 8 } },
    { name: 'Esteban', level: 1, hp: 10, max_hp: 10, sp_attack: 0, pp: 40, type: 'derecha', skills: [], position: { x: 5, y: 5 } },
    { name: 'Natalia', level: 2, hp: 15, max_hp: 15, sp_attack: 5, pp: 30, type: 'izquierda', skills: [], position: { x: 4, y: 9 } },
    { name: 'Emilia', level: 3, hp: 0, max_hp: 20, sp_attack: 7, pp: 20, type: 'centro', skills: [], position: { x: 1, y: 1 } },
];

// Inicializar la grilla con los enemigos


let classPlayer="";



// Función para mostrar el texto con efecto de máquina de escribir
function typeText(text, dialogue=$dialogueText) {
    return new Promise((resolve) => {
        let i = 0;
        isTyping = true;
        dialogue.textContent = "";

        function typeNextLetter() {
            if (i < text.length) {
                dialogue.textContent += text.charAt(i);
                i++;
                setTimeout(typeNextLetter, 50); // Control de velocidad de letras
            } else {
                isTyping = false;
                resolve();
            }
        }
        typeNextLetter();
    });
}

typeText('Despierta tengo noticias!!!');

$continue.addEventListener('click', async function() {
  if(isTyping) return;
  switch (steps) {
    case 0:
        await typeText("Pero lamentablemente son todas malas...");
        break;
    case 1:
        await typeText("1. Acabas de despertar y ya eres mayor de edad...");
        break;
    case 2:
        await typeText("2. Estas en Argentina...");
        break;
    case 3:
        await typeText("3. Estamos es período electoral por lo que tienes que elegir una ideología política para seguir viviendo ...");
        break;
    case 4:
        await typeText('Escoge una opción:');
        $selector.classList.remove('d-none');
        $continue.classList.add('d-none');
        break;
    case 6:
        nameplayer=$nameplayer.value;
        $inputcontainer.classList.add('d-none');
        player.name=nameplayer;
        player.type=classPlayer;
        cpu.type = assignOpponentType(classPlayer);
        await typeText(`Genial ${player.name}, comencemos con tu primer batalla...`);
        break;
    case 7:
        player.skills=addStarterSkills(player, skills);
        cpu.skills=addStarterSkills(cpu, skills);
        playerUI(player);
        skillsUI(player);
        opponentUI(cpu);
        $start.classList.add('d-none');
        $grid.classList.remove("d-none");
        break; 
    default:
  }
  steps++;
});

function assignOpponentType(playerType) {
    switch(playerType) {
        case 'izquierda': return 'derecha';
        case 'derecha': return 'izquierda';
        default: return 'derecha';
    }
}

$testBtn.addEventListener('click', function(){
    nameplayer="Leudos";
    classPlayer="izquierda"
    player.name=nameplayer
    player.type=classPlayer;
    player.skills=addStarterSkills(player, skills);
    playerUI(player);
    skillsUI(player);
    $start.classList.add('d-none');
    $grid.classList.remove("d-none");
    gridStart(enemies);
});

function gridStart(enemies) {
    let playerPosition = { x: 2, y: 2 }; // Posición inicial del jugador

    const gridSize = 25; // Tamaño de la grilla
    let grid = $('#grid');
    grid.empty(); // Limpiar la grilla si ya tiene contenido

    // Función para actualizar la posición del jugador y detectar contacto con los enemigos
    function updatePlayerPosition() {
        grid.empty(); // Limpiar la grilla

        // Generar la grilla
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let cell = $('<div>').addClass('grid-cell');
                grid.append(cell);

                // Colocar al jugador
                if (i === playerPosition.x && j === playerPosition.y) {
                    cell.addClass('player');
                }

                // Colocar a los enemigos
                enemies.forEach((enemy, index) => {
                    if(enemy.hp > 0){
                        if (i === enemy.position.x && j === enemy.position.y) {
                            cell.addClass('enemy');
                            cell.attr('data-enemy-index', index); // Vincular el índice del enemigo
    
                            // Comprobar si el jugador está en la misma posición que este enemigo
                            if (playerPosition.x === enemy.position.x && playerPosition.y === enemy.position.y) {
                                cell.addClass('contact'); // Clase de contacto
                                enemy.type=assignOpponentType(player.type);
                                enemy.skills=addStarterSkills(enemy, skills);
                                opponentUI(enemy);
                                $grid.classList.add("d-none");
                                $battlefield.classList.remove('d-none');
                                cpu=enemy;
                                return;
                            }
                        }
                    }
                });

                // Agregar evento de clic para mover al jugador
                cell.on('click', function () {
                    playerPosition.x = i;
                    playerPosition.y = j;
                    updatePlayerPosition();
                });
            }
        }
    }

    // Inicializar la grilla
    updatePlayerPosition();

    // Mover al jugador usando las teclas
    $(document).on('keydown', function (event) {
        switch (event.key) {
            case 'ArrowUp': // Flecha arriba
            case 'w': // Tecla W
                if (playerPosition.x > 0) playerPosition.x--;
                break;
            case 'ArrowDown': // Flecha abajo
            case 's': // Tecla S
                if (playerPosition.x < gridSize - 1) playerPosition.x++;
                break;
            case 'ArrowLeft': // Flecha izquierda
            case 'a': // Tecla A
                if (playerPosition.y > 0) playerPosition.y--;
                break;
            case 'ArrowRight': // Flecha derecha
            case 'd': // Tecla D
                if (playerPosition.y < gridSize - 1) playerPosition.y++;
                break;
            default:
                return;
        }
        updatePlayerPosition();
    });

    // Función para iniciar el combate con un enemigo
    function startCombat(enemy) {
        console.log(`Iniciando combate con ${enemy.name}`);
        // Ocultar la grilla y mostrar el campo de batalla
        $grid.addClass("d-none");
        $battlefield.classList.remove('d-none');
        // Aquí puedes agregar lógica para configurar el combate con el enemigo seleccionado
        cpu = { ...enemy }; // Configurar al enemigo como el oponente
        opponentUI(cpu); // Actualizar la interfaz del oponente
        typeText(`Te has encontrado con ${enemy.name}. ¡Prepárate para luchar!`, $dialogueTextCombat);
    }
}


// Evento para abrir el menú de habilidades
$fight.addEventListener('click', async function() {
    if (isTyping) return;
    $actions.classList.add('d-none');
    $skills.classList.remove('d-none');
    await typeText("Selecciona un ataque");
});

// Evento para cambiar de Luchador
$change.addEventListener('click', async function() {
    if (isTyping) return;
    $actions.classList.add('d-none');
    $friends.classList.remove('d-none');
    await typeText("Selecciona un compañero");
});

$selectorclass.addEventListener('change', async function() {
  if (isTyping) return;
  classPlayer = this.value;
  $selector.classList.add('d-none');
  await typeText('Recuérdame, ¿cómo te llamas?');
  $continue.classList.remove('d-none');
  $inputcontainer.classList.remove('d-none');
  steps++;
});

// Función de ataque
async function attack(move, player) {
    if (isTyping) return;
    if(player.pp < move.pp){
        await typeText(`PP insuficientes.`, $dialogueTextCombat);
        return;
    }
    let damage = move.damage;
    // Reducir la vida del oponente y actualizar la barra
    cpu.hp -= damage;
    player.pp -= move.pp;
    if (cpu.hp  < 0) cpu.hp  = 0;
    updateCpu(cpu);
    // Mostrar mensaje de ataque
    await typeText(`${player.name} usó ${move.name}! Causó ${damage} de daño.`, $dialogueTextCombat);

    // Comprobar si el oponente ha sido derrotado
    if (cpu.hp  <= 0) {
        await typeText(`¡Has ganado! ${cpu.name} ha sido derrotado.`,$dialogueTextCombat);
        gainExperience(player, 20);
        
        /*$skills.classList.add('d-none');
        $endBattle.classList.remove('d-none');*/
        $battlefield.classList.add("d-none");
        $grid.classList.remove('d-none');
        return;
    }
    // Ataque de respuesta del oponente
    setTimeout(() => opponentAttack(player), 2000);
}

// Función de ataque del oponente
async function opponentAttack(player) {
    const opponentContainer = document.getElementById('opponent');
    const opponentData = JSON.parse(opponentContainer.dataset.opponent);

    // Seleccionar una habilidad aleatoria del oponente
    const randomSkill = opponentData.skills[Math.floor(Math.random() * opponentData.skills.length)];

    // Aplicar el daño de la habilidad aleatoria
    const damage = randomSkill.damage;
    player.hp -= damage;
    cpu.pp -= randomSkill.pp;
    updatePlayer(player);

    // Mensaje de ataque usando la habilidad seleccionada
    await typeText(`¡${opponentData.name} usó ${randomSkill.name}! Causó ${damage} de daño a ${player.name}.`, $dialogueTextCombat);

    // Comprobar si el jugador ha sido derrotado
    if (player.hp <= 0) {
        await typeText(`¡Has perdido! ${player.name} ha sido derrotado.`, $dialogueTextCombat);
        $skills.classList.add('d-none');
        $start.classList.remove('d-none');
        $battlefield.classList.add("d-none");
    $grid.classList.remove('d-none');
    } else {
        // Volver al menú de acciones del jugador después de una breve pausa
        setTimeout(async () => {
            await typeText("¿Qué debería hacer?", $dialogueTextCombat);
            $skills.classList.add('d-none');
            $actions.classList.remove('d-none');
        }, 2000);
    }
}


// Función para cancelar el ataque y volver al menú principal
async function cancelAttack() {
    if (isTyping) return;
    $skills.classList.add('d-none');
    $actions.classList.remove('d-none');
    await typeText("¿Qué debería hacer Charmander?");
}

$endBattleBtn.addEventListener('click', function(){
    $start.classList.remove('d-none');
    $battlefield.classList.add("d-none");
    
});
$escape.addEventListener('click', function(){
    $battlefield.classList.add("d-none");
    $grid.classList.remove('d-none');
})

// Función para mostrar la UI del oponente
function opponentUI(opponent) {
    const opponentContainer = document.querySelector('.container-opponent');
    const opponentData = JSON.stringify(opponent);
    opponentContainer.innerHTML = `
        <div class="player-info" data-opponent='${opponentData}' id="opponent">
            <p class="player-name">${opponent.name}</p>
            <div class="health-bar">
                <div class="hp-label">HP</div>
                <div class="hp-bar">
                    <div class="hp-fill" id="opponent-hp" style="width: ${(opponent.hp / opponent.max_hp) * 100}%;"></div>
                </div>
            </div>
            <p class="player-level">Lv. ${opponent.level}</p>
        </div>
        <div class="player-sprite opponent-sprite"></div>
    `;
}

// Función para mostrar la UI del jugador
function playerUI(player) {
    const playerContainer = document.querySelector('.container-player');
    playerContainer.innerHTML = `
        <div class="player-sprite player-sprite"></div>
        <div class="player-info">
            <p class="player-name">${player.name}</p>
            <div class="health-bar">
                <div class="hp-label">HP</div>
                <div class="hp-bar">
                    <div class="hp-fill" id="player-hp" style="width: ${(player.hp / player.max_hp) * 100}%;"></div>
                </div>
            </div>
            <div class="right" id="healt-number">${player.hp}/${player.max_hp}</div>
            <div class="experience-bar">
                <div class="exp-label">EXP</div>
                <div class="exp-bar">
                    <div class="exp-fill" id="player-exp" style="width: ${(player.exp / player.max_exp) * 100}%;"></div>
                </div>
            </div>
            <div class="right" id="experience-number">${player.exp}/${player.max_exp}</div>
            <p class="player-level" id="level-player">Lv. ${player.level}</p>
            <p class="player-level" id="pp-player">PP. ${player.pp}</p>
        </div>
    `;
}

// Función para actualizar la barra de vida del jugador
function updatePlayer(player) {
    const playerHpFill = document.getElementById("player-hp");
    const playerExpFill = document.getElementById("player-exp");
    const healthText = document.getElementById("healt-number");
    const expText = document.getElementById("experience-number");
    const ppPlayer = document.getElementById("pp-player");
    
    playerHpFill.style.width = `${(player.hp / player.max_hp) * 100}%`;
    playerExpFill.style.width = `${(player.exp / player.max_exp) * 100}%`;
    healthText.textContent = `${player.hp}/${player.max_hp}`;
    expText.textContent = `${player.exp}/${player.max_exp}`;
    ppPlayer.textContent = `PP. ${player.pp}`;
}

// Función para actualizar la barra de vida del oponente
function updateCpu(opponent){
    const $opponentHp = document.getElementById('opponent-hp');
    const hpPercentage = (opponent.hp / opponent.max_hp) * 100;
    $opponentHp.style.width = `${hpPercentage}%`;
    $opponentHp.classList.remove('hp-warning', 'hp-danger');
    if (hpPercentage <= 50 && hpPercentage > 20) {
        $opponentHp.classList.add('hp-warning');
    } else if (hpPercentage <= 20) {
        $opponentHp.classList.add('hp-danger');
    }
}


// Función para cambiar de Compañero
function changePlayer(player) {
    playerUI(player);
    skillsUI(player);
    $friends.classList.add('d-none');
    $actions.classList.remove('d-none');
}

// Función para mostrar las habilidades del jugador
function skillsUI(player) {
    const skillsContainer = document.querySelector('#skills');
    skillsContainer.innerHTML = '';

    player.skills.forEach(skill => {
        const skillButton = document.createElement('button');
        skillButton.classList.add(skill.type, 'ps2p');
        skillButton.textContent = `${skill.name} / PP: ${skill.pp}`;
        skillButton.onclick = () => attack(skill, player);
        skillsContainer.appendChild(skillButton);
    });

    const backButton = document.createElement('button');
    backButton.textContent = 'Atrás';
    backButton.onclick = cancelAttack;
    backButton.classList.add('ps2p');
    skillsContainer.appendChild(backButton);
}

// Función para listar Compañeros disponibles
function listPlayersUI(listFriends) {
    const $friends = document.getElementById("friends");
    listFriends.forEach(friend => {
        const friendBtn = document.createElement('button');
        friendBtn.classList.add(friend.type);
        friendBtn.textContent = friend.name;
        friendBtn.onclick = () => changePlayer(friend);
        $friends.appendChild(friendBtn);
    });
}

function addStarterSkills(playercreated, listskills){
    const filterSkills = listskills.filter(skill=>
        skill.type === playercreated.type || skill.subtype === playercreated.type
    );
    const starterSkills = filterSkills.slice(0,4);
    return starterSkills;
}

async function gainExperience(player, expGained) {
    player.exp += expGained;
    updatePlayer(player);
    await typeText(`¡Has ganado ${expGained} puntos de experiencia!`, $dialogueTextCombat);
    if (player.exp >= player.max_exp) {
        player.level++;
        await typeText(`¡Has subido a nivel ${player.level}!`, $dialogueTextCombat);
        player.exp = 0;
        player.max_exp *= 2;

    }
    updatePlayer(player);
}
