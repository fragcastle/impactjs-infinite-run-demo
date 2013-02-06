ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

  'game.entities.player-runner',

  'game.entities.platform'
)
.defines(function(){

MyGame = ig.Game.extend({
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
  gravity: 700,

  clearColor: "#FFFFFF",

  platformSpawnTimer: null,

  player: null,

  patterns: [
    [32, 64, 96, 128],
  ],
  patternsIndex: 0,
  currentPattern: null,
  currentPatternIndex: 0,

	init: function() {
		// Initialize your game here; bind keys etc.
    this.player = this.spawnEntity( EntityPlayerRunner, 100, ig.system.height / 2 );

    this.platformSpawnTimer = new ig.Timer( 1 );

    this.map = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];

    this.collisionMap = new ig.CollisionMap( 16, this.map );

    this.bindInput();

    this.currentPattern = this.patterns[0];
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
    if( this.platformSpawnTimer.delta() >= 0 ) {
      var y = this.currentPattern[this.currentPatternIndex];

      ig.game.spawnEntity( EntityPlatform, ig.system.width - 100, ig.system.height - 50 - y );

      this.currentPatternIndex++;

      if( this.currentPatternIndex >= this.currentPattern.length  ) {
        this.patternsIndex++;

        if( this.patterns.length >= this.patternsIndex ) {
          this.patternsIndex = 0;
        }

        this.currentPattern = this.patterns[this.patternsIndex];
        this.currentPatternIndex = 0;
      }

      this.platformSpawnTimer.reset();
    }
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	},

  bindInput: function() {
    ig.input.bind(ig.KEY.X, 'jump');
    ig.input.bind(ig.KEY.C, 'shoot');
    ig.input.bind(ig.KEY.ENTER, 'ok');
    ig.input.bind(ig.KEY._5, 'restart');
  }
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
