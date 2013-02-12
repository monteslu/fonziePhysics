define([
  './update',
  './draw',
  './Head',
  './entities',
  'dojo/keys',
  'frozen/utils/radiansFromCenter',
  'frozen/utils/scalePoints',
  'frozen/box2d/BoxGame',
  'frozen/box2d/RectangleEntity',
  'frozen/box2d/CircleEntity',
  'frozen/box2d/PolygonEntity',
  'frozen/box2d/joints/Revolute'

], function(update, draw, Head, entities, keys, radiansFromCenter, scalePoints, BoxGame, Rectangle, Circle, Polygon, Revolute){

  var speed = 10;

  //setup a GameCore instance
  var game = new BoxGame({
    canvasId: 'canvas',
    gameAreaId: 'gameArea',
    canvasPercentage: 0.95,
    height: 600,
    width: 800,
    update: update,
    draw: draw,
    initInput: function(im){
      im.addKeyAction(keys.LEFT_ARROW);
      im.addKeyAction(keys.RIGHT_ARROW);
      im.addKeyAction(keys.UP_ARROW);
      im.addKeyAction(keys.DOWN_ARROW);

      im.addKeyAction('A');
      im.addKeyAction('D');
    },
    handleInput: function(im){
      if(im.keyActions[keys.LEFT_ARROW].isPressed()){
        this.box.applyImpulseDegrees('torso', 270, speed);
      }

      if(im.keyActions[keys.RIGHT_ARROW].isPressed()){
        this.box.applyImpulseDegrees('torso', 90, speed);
      }

      if(im.keyActions[keys.UP_ARROW].isPressed()){
        this.box.applyImpulseDegrees('torso', 0, speed);
      }

      if(im.keyActions['A'].isPressed()){
        this.box.applyTorque('torso', -speed * 100);
      }

      if(im.keyActions['D'].isPressed()){
        this.box.applyTorque('torso', speed  * 100);
      }

      if(im.touchAction.isPressed()){
        this.box.applyImpulse('torso', radiansFromCenter(this.entities.torso, scalePoints(im.touchAction.position, 1/this.box.scale)), speed);
      }else if(im.mouseAction.isPressed()){
        this.box.applyImpulse('torso', radiansFromCenter(this.entities.torso, scalePoints(im.mouseAction.position, 1/this.box.scale)), speed);
      }

    }
  });


    entities.entities.forEach(function(obj){
      var entity;
      if(obj.id === 'head'){
        entity = new Head(obj);
      }
      else if(obj.type === 'Rectangle'){
        entity = new Rectangle(obj);
      }else if(obj.type === 'Circle'){
        entity = new Circle(obj);
      }
      else if(obj.type === 'Polygon'){
        entity = new Polygon(obj);
      }

      if(entity){
        game.box.addBody(entity);
        game.entities[entity.id] = entity;
      }
    });

    entities.joints.forEach(function(obj){
      var joint;
      if(obj.type === 'Revolute'){
        joint = new Revolute(obj);
      }

      if(joint){
        game.box.addJoint(joint);
        //game.box.joints[joint.id] = joint;
      }
    });



  //if you want to take a look at the game object in dev tools
  console.log(game);

  //launch the game!
  game.run();

});