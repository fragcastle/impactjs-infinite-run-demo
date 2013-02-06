ig.module( 
  'game.entities.player-runner' 
)
.requires(
  'impact.entity'
)
.defines(function(){

EntityPlayerRunner = ig.Entity.extend({
  animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),

  type: ig.Entity.TYPE.A,
  checkAgainst: ig.Entity.TYPE.NONE,
  collides: ig.Entity.COLLIDES.PASSIVE,

  size: { x: 16, y: 16 },

  maxVel: { x: 0, y: 450 },
  friction: { x: 0, y: 0 },
  bounciness: 0,

  jumpSpeed: 350,

  fixedPos: { x: 0, y: 0 },

  init: function( x, y, settings ) {
    this.addAnim( 'idle', 0.1, [0] );

    this.parent( x, y, settings );

    this.fixedPos.x = x;
  },

  update: function() {
    if( this.standing && ig.input.pressed('jump') ) {
      this.vel.y -= this.jumpSpeed;
    }

    this.parent();

    this.pos.x = this.fixedPos.x;
  }
});
});