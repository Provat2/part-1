//person defining
var person, personImage;
//student defining
var student, studentImage;
//ground defining
var ground, groundImage;
//house defining
var house, house_1, house_2, house_3, house_4;
//defining school
var school, schoolImage;
//cloud defining
var cloud, cloudImage;
//defining bush
var bush, bushImage;
//obstacle defining - 1
var obstacle1, obstacleImage1;
//creating bus
var bus, busImage;

//defining and creating groups
var houseGroup, obstacle1Group, studentGroup;

//creating gameState
var gameState = 1;

//loading Images...
function preload(){
    //personImage = loadImage("images/character.gif");//person image loading
    studentImage = loadImage("student.gif");//student image loading
    groundImage = loadImage("ground.png");//ground image loading
    house_1 = loadImage("house1.jpg"); //loading house - 1
    house_2 = loadImage("house2.png");//loading house - 2
    house_3 = loadImage("house3.jpg");//loading house - 3
    house_4 = loadImage("house4.png");//loading house - 4
    schoolImage = loadImage("school.jpg");//loading the school
    cloudImage = loadImage("cloud.jpg");//loading cloud
    bushImage = loadImage("bush.png");//loading bush
    obstacleImage1 = loadImage("obstacle1.png");//loading obstacle - 1
}

function setup(){
    //creating the canvas
    
    createCanvas(displayWidth, displayHeight);

    //creating the ground
    ground = createSprite(displayWidth/2, displayHeight-200, displayWidth, 12);
    
    obstacle1Group = new Group();
    studentGroup = new Group();
    
}



function draw(){
    background("white");
    spawnCloud();
    if (gameState === 1){
        createhouse();//spawning house
        createObstacle();//spawning obstacle
        children();//spawning students at the gate
        spawnBus();//spawning the bus for level 2
        if (person.x === bus.x && person.y === bus.y){
            student.destroyEach();//disappearing purpose
            person.destroy();//disappearing purpose
            gameState = 2;//level-2 coming
        }
        if (person.isTouching(obstacle1Group)){
            gameState = 4;//game over 
        }
    }


    
    drawSprites();
}

function createhouse(){
    if (frameCount % 140 === 0){
        house = createSprite(displayWidth+20, displayHeight-400, 20, 20);
        house.addImage(house_1);
        house.velocityX = -5;
        house.scale = 1.5;   
        house.lifetime = 350; 
        house.depth = obstacle1.depth;
        obstacle1.depth += 1;
    }
    return house;
}

function createObstacle(){
    if (frameCount % 80 === 0){
        obstacle1 = createSprite(displayWidth+15, displayHeight-250, 10, 10);
        obstacle1.addImage(obstacleImage1);
        obstacle1.scale = 0.04;
        obstacle1.velocityX = -5;
        obstacle1.lifetime = 350;
        obstacle1Group.add(obstacle1);
    }
    
    return obstacle1;
}

function children(){
    if (frameCount % 280 === 0){
        student = createSprite(displayWidth+20, displayHeight-260, 30, 30);
        student.addImage(studentImage);
        student.scale = 0.1;
        student.depth = obstacle1.depth;
        student.depth += 1;
        student.debug = true;
        student.velocityX = -5;
        studentGroup.add(student);
    }
    return student;
}

function spawnCloud(){
    if (frameCount % 60 === 0){
        cloud = createSprite(displayWidth+15, 55, 10, 10);
        cloud.addImage(cloudImage);
        cloud.scale = 0.2;
        cloud.velocityX = -3.5;
        cloud.lifetime = 400;
    }
    return cloud;
}

function spawnBus(){
    if (frameCount % 3000 === 0){
        bus = createSprite(displayWidth+20, displayHeight-330);
        bus.addImage(busImage);
        bus.scale = 0.2;
    }
}