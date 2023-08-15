import * as THREE from 'three';
import { func } from 'three/examples/jsm/nodes/Nodes.js';

class MainMenu {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  private menuItem1: THREE.Mesh;
  private menuItem2: THREE.Mesh;

  constructor(){

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById('app') as HTMLCanvasElement
        });

        // Configure the canvas size and text properties
        const geometry1 = new THREE.PlaneGeometry(2, 1); // Adjust this size as needed
        this.menuItem1 = new THREE.Mesh(geometry1, MakeTextTexture("Start Game", 128, 64));
        this.menuItem1.name = "StartGame";

        
        const geometry2 = new THREE.PlaneGeometry(2, 1); // Adjust this size as needed
        this.menuItem2 = new THREE.Mesh(geometry2, MakeTextTexture("Exit??", 128, 64));
        this.menuItem2.name = "Exit / Reload";

        this.menuItem1.position.set(0,1,0);
        this.menuItem2.position.set(0,-1,0);

        this.scene.add(this.menuItem1);
        this.scene.add(this.menuItem2);

        // Create a texture from the canvas


      this.renderer.setSize(512, 512);
      
      this.camera.position.set(0,0,5);

      this.renderer.render(this.scene, this.camera);
      this.renderer.domElement.addEventListener('click', this.onClick);

    }

    onClick = (event: any) =>{
      this.mouse.x = ((event.clientX / window.innerWidth) * 2) - 1;
      this.mouse.y = ((event.clientY / window.innerHeight) * -2) + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      const intersects = this.raycaster.intersectObjects(this.scene.children);
      
      for (const element of intersects) {
          
        
        switch(element.object.name){
          case "StartGame":
            console.log("Start Game");

            while (this.scene.children.length > 0){
              this.scene.remove(this.scene.children[0]);
            }
            this.renderer.domElement.removeEventListener('click', this.onClick);
            this.renderer.clear();
            
            const R = new GameEngine();
            break;
          case "Exit":
            //went with Reload because I am not going to just crash the browser. 
            console.log("Exit");
            location.reload();
            break;
          }
            
        }
    }

}

class WinMenu {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  private menuItemCongratz: THREE.Mesh;
  private menuItem1: THREE.Mesh;
  private menuItem2: THREE.Mesh;

  constructor(text: string){

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById('app') as HTMLCanvasElement
        });

        const geometryCongratz = new THREE.PlaneGeometry(2, 1); // Adjust this size as needed
        this.menuItemCongratz = new THREE.Mesh(geometryCongratz, MakeTextTexture(text + " Wins!", 128, 64));
        this.menuItemCongratz.name = "Congratz";


        // Configure the canvas size and text properties
        const geometry1 = new THREE.PlaneGeometry(2, 1); // Adjust this size as needed
        this.menuItem1 = new THREE.Mesh(geometry1, MakeTextTexture("Play Again?", 128, 64));
        this.menuItem1.name = "PlayAgain";

        
        const geometry2 = new THREE.PlaneGeometry(2, 1); // Adjust this size as needed
        this.menuItem2 = new THREE.Mesh(geometry2, MakeTextTexture("Exit??", 128, 64));
        this.menuItem2.name = "Exit / Reload";

        this.menuItemCongratz.position.set(0,2.5,0);
        this.menuItem1.position.set(0,1,0);
        this.menuItem2.position.set(0,-1,0);

        this.scene.add(this.menuItemCongratz);
        this.scene.add(this.menuItem1);
        this.scene.add(this.menuItem2);

        // Create a texture from the canvas


      this.renderer.setSize(512, 512);
      
      this.camera.position.set(0,0,5);

      this.renderer.render(this.scene, this.camera);
      this.renderer.domElement.addEventListener('click', this.onClick);

    }

    onClick = (event: any) =>{
      this.mouse.x = ((event.clientX / window.innerWidth) * 2) - 1;
      this.mouse.y = ((event.clientY / window.innerHeight) * -2) + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      const intersects = this.raycaster.intersectObjects(this.scene.children);
      
      for (const element of intersects) {
          
        while (this.scene.children.length > 0){
          this.scene.remove(this.scene.children[0]);
        }
        this.renderer.domElement.removeEventListener('click', this.onClick);
        this.renderer.clear();
        switch(element.object.name){
          case "PlayAgain":
            console.log("PlayAgain");
            const R = new GameEngine();
            break;
          case "Exit / Reload":
            //went with Reload because I am not going to just crash the browser. 
            console.log("Exit");
            GameStart();
            break;
          }
            
        }
    }

}

class MenuText {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private texture: THREE.Texture;

  constructor(text: string) {
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d')!;

      // Configure the canvas size and text properties
      this.canvas.width = 128;
      this.canvas.height = 128;
      this.context.fillStyle = 'white';
      this.context.fillRect(0,0,this.canvas.width, this.canvas.height);

      this.context.font = '48px Arial';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillStyle = 'blue';
      this.context.fillText(text, this.canvas.width / 2, this.canvas.height / 2);


      // Create a texture from the canvas
      this.texture = new THREE.CanvasTexture(this.canvas);
  }

  public SwapTexture(n: number): void {
    this.canvas.width = 128;
    this.canvas.height = 128;
    this.context.fillStyle = 'white';
    this.context.fillRect(0,0,this.canvas.width, this.canvas.height);

    this.context.font = '48px Arial';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';

    switch(n){
      case 0:
        this.context.fillStyle = 'blue';
        this.context.fillText("_", this.canvas.width / 2, this.canvas.height / 2);
        this.texture = new THREE.CanvasTexture(this.canvas);
        break;
      case 1:        
        this.context.fillStyle = 'blue';
        this.context.fillText("X", this.canvas.width / 2, this.canvas.height / 2);
        this.texture = new THREE.CanvasTexture(this.canvas);
        break;
      case 2:
        this.context.fillStyle = 'blue';
        this.context.fillText("O", this.canvas.width / 2, this.canvas.height / 2);
        this.texture = new THREE.CanvasTexture(this.canvas);
        break;
    }

  }

  createMesh(): THREE.Mesh {
      const geometry = new THREE.BoxGeometry(1, 1, 1); // Adjust this size as needed
      const material = new THREE.MeshBasicMaterial({ map: this.texture });
      const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      return new THREE.Mesh(geometry, material);
  }
}

enum PlayersTurn{
  "X",
  "O"
}

export class GameEngine {
  private WinCondition: boolean;
  private playersTurn: PlayersTurn; 
  
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private GameBoard: THREE.Mesh;
  private Xes: THREE.Mesh;
  private Oes: THREE.Mesh;

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  private ngo: THREE.Mesh;
  private eo: THREE.Mesh;
  private tictactoeGameBoard: THREE.Mesh[][] = new Array(3);



  constructor(){

      this.WinCondition = false;
      this.playersTurn = PlayersTurn.X;

      this.scene = new THREE.Scene();
      const aspect = 1;
      this.camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000);
      //this.camera =  new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById('app') as HTMLCanvasElement
        });
      
       
      this.renderer.setSize(512, 512);
      
      this.camera.position.set(0,0,5);

      const BaseTexture = new MenuText("_");

      for(let i = 0; i < 3; i++){
        this.tictactoeGameBoard[i] = new Array(3);
        for ( let j = 0; j < 3; j++){
          this.tictactoeGameBoard[i][j] = BaseTexture.createMesh();
          this.tictactoeGameBoard[i][j].position.set((j-1)*1.1, (i-1)*1.1, 0);
          this.tictactoeGameBoard[i][j].name = i.toString() + j.toString();
          console.log(this.tictactoeGameBoard[i][j].name);
          this.scene.add(this.tictactoeGameBoard[i][j]);
        }

      }

      this.renderer.render(this.scene, this.camera);
      

      // Apply a resize event Cause let's be honest. Otherwise it would make me look sloppy. 
      window.addEventListener('resize', ()=> {
        this.camera.aspect = 1; //window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(512, 512);
        
      })

      this.renderer.domElement.addEventListener('click', (event) =>{
        this.mouse.x = ((event.clientX / window.innerWidth) * 2) - 1;
        this.mouse.y = ((event.clientY / window.innerHeight) * -2) + 1;

        
        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children);
        const Material = MakeTextTexture(this.playersTurn.toString(), 256, 256);

        for (const element of intersects) {
            if (element.object instanceof THREE.Mesh && element.object.material instanceof THREE.MeshBasicMaterial){
              
              
              switch(element.object.name){
                  case "00":
                  console.log("00 Hit");
                  element.object.material = Material;
                  element.object.name = this.playersTurn.toString();

                  this.CheckForWin();
                  this.NextTurn();
                  break;
                  case "01":
                    console.log("01 Hit");
                    element.object.material = Material;
                    element.object.name = this.playersTurn.toString();
  
                    this.CheckForWin();
                    this.NextTurn();
                  break;
                  case "02":
                    console.log("02 Hit");
                    element.object.material = Material;
                    element.object.name = this.playersTurn.toString();
  
                    this.CheckForWin();
                    this.NextTurn();
                  break;
                  case "10":
                    console.log("10 Hit");
                    element.object.material = Material;
                    element.object.name = this.playersTurn.toString();
  
                    this.CheckForWin();
                    this.NextTurn();
                  break;
                  case "11":
                    console.log("11 Hit");
                    element.object.material = Material;
                    element.object.name = this.playersTurn.toString();
  
                    this.CheckForWin();
                    this.NextTurn();
                  break;
                  case "12":
                    console.log("12 Hit");
                    element.object.material = Material;
                    element.object.name = this.playersTurn.toString();
  
                    this.CheckForWin();
                    this.NextTurn();
                  break;
                  case "20":
                  console.log("20 Hit");
                  element.object.material = Material;
                  element.object.material.needsUpdate = true;
                  element.object.name = this.playersTurn.toString();

                  this.CheckForWin();
                  this.NextTurn();
                  break;
                  case "21":
                    console.log("21 Hit");
                    element.object.material = Material;
                    element.object.name = this.playersTurn.toString();
  
                    this.CheckForWin();
                    this.NextTurn();
                  break;
                  case "22":
                    console.log("22 Hit");
                    element.object.material = Material;
                    element.object.name = this.playersTurn.toString();
  
                    this.CheckForWin();
                    this.NextTurn();
                  break;
                  }
                  
              }  
          }
      });
      
  }

  public NextTurn(): void{
    if ( this.playersTurn === PlayersTurn.X )
    {
      this.playersTurn = PlayersTurn.O;
    }
    else if ( this.playersTurn === PlayersTurn.O)
    {
      this.playersTurn = PlayersTurn.X;
    }
  }

  public CheckForWin(): void{
    
    // Win Conditions -> 
    // 20 21 22   
    // 10 11 12   
    // 00 01 02   
    //  Conditions 
    // Check Horizontal
    // Add makeup to this pig.
    if (this.tictactoeGameBoard[0][0].name === this.playersTurn.toString() &&
        this.tictactoeGameBoard[0][1].name === this.playersTurn.toString() &&
        this.tictactoeGameBoard[0][2].name === this.playersTurn.toString() )
    {this.WinCondition = true;}
    else if ( this.tictactoeGameBoard[1][0].name === this.playersTurn.toString() &&
              this.tictactoeGameBoard[1][1].name === this.playersTurn.toString() &&
              this.tictactoeGameBoard[1][2].name === this.playersTurn.toString())
            {this.WinCondition = true;}
    else if ( this.tictactoeGameBoard[2][0].name === this.playersTurn.toString() &&
            this.tictactoeGameBoard[2][1].name === this.playersTurn.toString() &&
            this.tictactoeGameBoard[2][2].name === this.playersTurn.toString())
            {this.WinCondition = true;}
    else if ( this.tictactoeGameBoard[0][0].name === this.playersTurn.toString() &&
          this.tictactoeGameBoard[1][0].name === this.playersTurn.toString() &&
          this.tictactoeGameBoard[2][0].name === this.playersTurn.toString())
          {this.WinCondition = true;}
    else if ( this.tictactoeGameBoard[0][1].name === this.playersTurn.toString() &&
          this.tictactoeGameBoard[1][1].name === this.playersTurn.toString() &&
          this.tictactoeGameBoard[2][1].name === this.playersTurn.toString())
          {this.WinCondition = true;}
    else if ( this.tictactoeGameBoard[0][2].name === this.playersTurn.toString() &&
          this.tictactoeGameBoard[1][2].name === this.playersTurn.toString() &&
          this.tictactoeGameBoard[2][2].name === this.playersTurn.toString())
          {this.WinCondition = true;}
    else if ( this.tictactoeGameBoard[0][0].name === this.playersTurn.toString() &&
          this.tictactoeGameBoard[1][1].name === this.playersTurn.toString() &&
          this.tictactoeGameBoard[2][2].name === this.playersTurn.toString())
          {this.WinCondition = true;}
    else if ( this.tictactoeGameBoard[2][0].name === this.playersTurn.toString() &&
          this.tictactoeGameBoard[1][1].name === this.playersTurn.toString() &&
          this.tictactoeGameBoard[2][2].name === this.playersTurn.toString())
          {this.WinCondition = true;}


    if (this.WinCondition === true){
      while (this.scene.children.length > 0){
        this.scene.remove(this.scene.children[0]);
      }
      console.log("Win Menu");
      const W = new WinMenu(this.playersTurn.toString());
    }
    else this.renderer.render(this.scene, this.camera);
    

  }

  public ClearScene(): void{
    this.scene.clear();

  }

  public GetScene(): THREE.Scene{
    return this.scene;
  }

  
}

function GameStart(): void {
  const R = new MainMenu();
}

function MakeTextTexture(text: string, w:number, h:number): THREE.MeshBasicMaterial {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.width = w;
  canvas.height = h;
  context.fillStyle = 'white';
  context.fillRect(0,0, canvas.width, canvas.height);

  context.font = '24px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = 'blue';
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  return material;
}

GameStart();



