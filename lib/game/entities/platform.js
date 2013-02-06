ig.module( 
  'game.entities.platform' 
)
.requires(
  'impact.entity'
)
.defines(function(){

EntityPlatform = ig.Entity.extend({
  animSheet: new ig.AnimationSheet( 'media/platform.png', 64, 4 ),

  type: ig.Entity.TYPE.NONE,
  checkAgainst: ig.Entity.TYPE.NONE,
  collides: ig.Entity.COLLIDES.FIXED,

  size: { x: 64, y: 4 },
  maxVel: { x: 200, y: 0 },
  vel: { x: -150, y: 0 },

  gravityFactor: 0,

  init: function( x, y, settings ) {
    this.addAnim( 'idle', 0.1, [0] );
    this.parent( x, y, settings );
  },

  update: function() {
    this.parent();

    if( this.pos.x < -this.size.x ) {
      this.kill();
    }
  }
});
});