import * as THREE from 'three';

class SceneListRender {
  private static instance: SceneListRender;

  private Offset: number;
  private CurrentOffset: number;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer; 

  private constructor() {
    this.Offset = 0;
    this.CurrentOffset = 0;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('app') as HTMLCanvasElement
    });

    this.renderer.setSize(512, 512);
    this.camera.position.set(0,0,5);

  }
  public getScene(): THREE.Scene{
    return this.scene;
  }

  public getCamera(): THREE.PerspectiveCamera{
    return this.camera;
  }

  public getRenderer(): THREE.WebGLRenderer{
    return this.renderer;
  }

  public static getInstance(): SceneListRender{
    if (!SceneListRender.instance){
      SceneListRender.instance = new SceneListRender();
    }

    return SceneListRender.instance;
  }

  public MoveCameraTo(n: number): void {
    this.camera.position.set(n,0,5);
    this.renderer.render(this.scene, this.camera);
  }

  public Rerender(): void {
    this.renderer.render(this.scene, this.camera);
  }

}

class MainMenu {

  private isActive: boolean;
  private slr: SceneListRender;

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  private menuItem1: THREE.Mesh;
  private menuItem2: THREE.Mesh;

  constructor(offset: number){
      this.isActive = true;
      this.slr = SceneListRender.getInstance();

        // Configure the canvas size and text properties
      const geometry1 = new THREE.PlaneGeometry(2, 1); // Adjust this size as needed
      this.menuItem1 = new THREE.Mesh(geometry1, MakeTextTexture("Start Game", 128, 64));
      this.menuItem1.name = "StartGame";

      const geometry2 = new THREE.PlaneGeometry(2, 1); // Adjust this size as needed
      this.menuItem2 = new THREE.Mesh(geometry2, MakeTextTexture("Exit??", 128, 64));
      this.menuItem2.name = "Exit / Reload";

      this.menuItem1.position.set(0,1,0);
      this.menuItem2.position.set(0,-1,0);

      this.slr.getScene().add(this.menuItem1);
      this.slr.getScene().add(this.menuItem2);
      this.slr.Rerender();

      this.slr.getRenderer().domElement.addEventListener('click', this.onClick);
    }
    public SetActive (b:boolean){
      this.isActive = b;
    }
    
    onClick = (event: MouseEvent) =>{
      if(!this.isActive){return;}
      const canvas = document.getElementById('app') as HTMLCanvasElement;
      const rect = this.slr.getRenderer().domElement.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      this.mouse.x = (x / canvas.clientWidth * 2) - 1;
      this.mouse.y = (y / canvas.clientHeight * -2) + 1;

      this.raycaster.setFromCamera(this.mouse, this.slr.getCamera());

      const intersects = this.raycaster.intersectObjects(this.slr.getScene().children);
      
      for (const element of intersects) {
          
        
        switch(element.object.name){
          case "StartGame":

            fGameEngine.Reset();
            this.slr.MoveCameraTo(20);
            this.SetActive(false);
            fGameEngine.SetActive(true);
            break;
          case "Exit":
            //went with Reload because I am not going to just crash the browser. 
            console.log("Exit");
            location.reload();
            break;
          }
            
        }
        event.stopPropagation();
    }

}

class WinMenu {
  private slr: SceneListRender;
  private isActive: boolean;

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  private menuItemCongratz: THREE.Mesh;
  private menuItem1: THREE.Mesh;
  private menuItem2: THREE.Mesh;

  constructor(text: string){
    this.isActive = false;
    this.slr = SceneListRender.getInstance();


    const geometryCongratz = new THREE.PlaneGeometry(2, 1); // Adjust this size as needed
    this.menuItemCongratz = new THREE.Mesh(geometryCongratz, MakeTextTexture(text, 128, 64));
    this.menuItemCongratz.name = "Congratz";


    // Configure the canvas size and text properties
    const geometry1 = new THREE.PlaneGeometry(2, 1); // Adjust this size as needed
    this.menuItem1 = new THREE.Mesh(geometry1, MakeTextTexture("Play Again?", 128, 64));
    this.menuItem1.name = "PlayAgain";

    
    const geometry2 = new THREE.PlaneGeometry(2, 1); // Adjust this size as needed
    this.menuItem2 = new THREE.Mesh(geometry2, MakeTextTexture("Exit??", 128, 64));
    this.menuItem2.name = "Exit / Reload";

    this.menuItemCongratz.position.set(10,2.5,0);
    this.menuItem1.position.set(10,1,0);
    this.menuItem2.position.set(10,-1,0);

    this.slr.getScene().add(this.menuItemCongratz);
    this.slr.getScene().add(this.menuItem1);
    this.slr.getScene().add(this.menuItem2);

        // Create a texture from the canvas


      this.slr.getRenderer().setSize(512, 512);
      
      this.slr.getCamera().position.set(10,0,5);

      this.slr.Rerender();
      this.slr.getRenderer().domElement.addEventListener('click', this.onClick);

    }
    public SetActive (b:boolean){
      this.isActive = b;
    }

    onClick = (event: MouseEvent) =>{
      
      if ( !this.isActive){return;}
      const canvas = document.getElementById('app') as HTMLCanvasElement;
      const rect = this.slr.getRenderer().domElement.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      this.mouse.x = (x / canvas.clientWidth * 2) - 1;
      this.mouse.y = (y / canvas.clientHeight * -2) + 1;

      this.raycaster.setFromCamera(this.mouse, this.slr.getCamera());

      const intersects = this.raycaster.intersectObjects(this.slr.getScene().children);
      
      for (const element of intersects) {

        switch(element.object.name){
          case "PlayAgain":
            console.log("PlayAgain");

            this.slr.MoveCameraTo(20);
            this.SetActive(false);
            fGameEngine.SetActive(true);
            fGameEngine.Reset();
            this.slr.Rerender();
            break;
          case "Exit / Reload":
            //went with Reload because I am not going to just crash the browser. 
            console.log("Exit");

            this.slr.MoveCameraTo(0);
            this.SetActive(false);
            fMainMenu.SetActive(true);
            break;
          }
            
        }
        event.stopPropagation();
    }

}

class MenuText {
  private isActive: boolean;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private texture: THREE.Texture;

  constructor(text: string) {
      this.isActive = false;
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
  public SetActive (b:boolean){
    this.isActive = b;
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
  private isActive: boolean;

  private WinCondition: boolean;
  private playersTurn: PlayersTurn; 

  private slr: SceneListRender;
  
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  private tictactoeGameBoard: THREE.Mesh[][] = new Array(3);

  constructor(offset:number){

      this.isActive = false;
      this.slr = SceneListRender.getInstance();
      this.WinCondition = false;
      this.playersTurn = PlayersTurn.X;

      const BaseTexture = new MenuText("_");

      for(let i = 0; i < 3; i++){
        this.tictactoeGameBoard[i] = new Array(3);
        for ( let j = 0; j < 3; j++){
          this.tictactoeGameBoard[i][j] = BaseTexture.createMesh();
          this.tictactoeGameBoard[i][j].position.set(((j-1)*1.1)+offset, (i-1)*1.1, 0);
          this.tictactoeGameBoard[i][j].name = i.toString() + j.toString();
          console.log(this.tictactoeGameBoard[i][j].name);
          this.slr.getScene().add(this.tictactoeGameBoard[i][j]);
        }

      }

      this.slr.Rerender();
      

      // Apply a resize event Cause let's be honest. Otherwise it would make me look sloppy. 
      /*
      window.addEventListener('resize', ()=> {
        this.camera.aspect = 1; //window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(512, 512);
        
      })
      */

      this.slr.getRenderer().domElement.addEventListener('click', (event) =>{
        if (!this.isActive){return;}
        const canvas = document.getElementById('app') as HTMLCanvasElement;
        const rect = this.slr.getRenderer().domElement.getBoundingClientRect();
  
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
  
        this.mouse.x = (x / canvas.clientWidth * 2) - 1;
        this.mouse.y = (y / canvas.clientHeight * -2) + 1;

        
        this.raycaster.setFromCamera(this.mouse, this.slr.getCamera());

        const intersects = this.raycaster.intersectObjects(this.slr.getScene().children);
        let s: string = null
         if ( this.playersTurn === PlayersTurn.X ){
            s = "X"
         }
         else 
         { s = "O"}
        const Material = MakeTextTexture(s, 64, 64);

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
          event.stopPropagation();
      });
      
  }
  public SetActive (b:boolean){
    this.isActive = b;
  }
  
  public Reset(): void{
    this.WinCondition = false;

    const Material = MakeTextTexture("_", 64, 64);
    
    for ( let i = 0; i < 3; i++){
      for ( let j = 0; j < 3; j++){
      this.tictactoeGameBoard[i][j].material = Material;
      this.tictactoeGameBoard[i][j].name = i.toString() + j.toString();
      }
    }
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

    for(let i = 0; i < 3; i++){
      if( this.tictactoeGameBoard[i][0].name == this.playersTurn.toString() && 
      this.tictactoeGameBoard[i][0].name === this.tictactoeGameBoard[i][1].name && 
      this.tictactoeGameBoard[i][1].name === this.tictactoeGameBoard[i][2].name)
      {
        this.WinCondition = true;
      }
      if( this.tictactoeGameBoard[0][i].name == this.playersTurn.toString() && 
      this.tictactoeGameBoard[0][i].name === this.tictactoeGameBoard[1][i].name && 
      this.tictactoeGameBoard[1][i].name === this.tictactoeGameBoard[2][i].name)
      {
        this.WinCondition = true;
      }
    }
    if( this.tictactoeGameBoard[0][0].name == this.playersTurn.toString() && 
      this.tictactoeGameBoard[0][0].name === this.tictactoeGameBoard[1][1].name && 
      this.tictactoeGameBoard[1][1].name === this.tictactoeGameBoard[2][2].name)
      {
        this.WinCondition = true;
      }
    if( this.tictactoeGameBoard[2][0].name == this.playersTurn.toString() && 
    this.tictactoeGameBoard[2][0].name === this.tictactoeGameBoard[1][1].name && 
    this.tictactoeGameBoard[1][1].name === this.tictactoeGameBoard[0][2].name)
    {
      this.WinCondition = true;
    }

    let draw = true;
    for ( let i = 0; i < 3; i++){
      for ( let j = 0; j < 3; j++ ){
        if( this.tictactoeGameBoard[i][j].name != "0" &&
            this.tictactoeGameBoard[i][j].name != "1"){
              draw = false;
            }

      }
    }
   


    if (this.WinCondition === true || draw === true){
      if (draw === true ){

        this.slr.MoveCameraTo(10);
        this.SetActive(false);
        fWinMenu.SetActive(true);
        fGameEngine.Reset();
        const W = new WinMenu("Tie :(");
      }
      else if ( this.playersTurn === PlayersTurn.O){

        this.slr.MoveCameraTo(10);
        this.SetActive(false);
        fWinMenu.SetActive(true);
        const W = new WinMenu("O Wins!");
      }
      else if ( this.playersTurn === PlayersTurn.X){

        this.slr.MoveCameraTo(10);
        this.SetActive(false);
        fWinMenu.SetActive(true);
        const W = new WinMenu("X Wins!");
      }
      
    }
    else this.slr.Rerender();
    

  }

 
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


const sceneListRender = SceneListRender.getInstance();
const fWinMenu = new WinMenu("_", 10);
const fMainMenu = new MainMenu(0);
const fGameEngine = new GameEngine(20);

sceneListRender.MoveCameraTo(0);




