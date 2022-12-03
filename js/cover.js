const {
    gsap,
    gsap: {to, timeline, set},
    Splitting
} = window

const comic = document.querySelector('.container')

const LOAD_TL = timeline();
LOAD_TL
    .to('.progress-bar', 0.8,{
        width: '5%',
        'background-color': '#f63a0f'
    })
    .to('.progress-bar', 0.8,{
        width: '25%',
        'background-color': '#f27011'
    })
    .to('.progress-bar', 0.8,{
        width: '50%',
        'background-color': '#f2b01e'
    })
    .to('.progress-bar', 1.6,{
        width: '80%',
        'background-color': '#f2d31b'
    })
    .addPause("PAUSE_WAIT")
    .to('.progress-bar', 0.8,{
        width: '100%',
        'background-color': '#f2d31b'
    })
    .to('.progress', 0.5, {
        opacity: 0
    })
    .to('.scroll-left', 0.5, {
        opacity: 1
    })

window.onload = e => {
    LOAD_TL.removePause("PAUSE_WAIT")
    LOAD_TL.play();
    comic.classList.remove("not-display")
}

const LEFT_BTN = document.querySelector('.scroll-left')
const BTN = document.querySelector('.birthday-button__button')
const SOUNDS = {
    CHEER: new Audio('audio/cheer-done.mp3'),
    MATCH: new Audio('audio/match-done.mp3'),
    TUNE: new Audio('audio/tune-done.mp3'),
    ON: new Audio('audio/on-done.mp3'),
    BLOW: new Audio('audio/blow-done.mp3'),
    POP1: new Audio('audio/pop1.mp3'),
    POP2: new Audio('audio/pop2.mp3'),
    POP3: new Audio('audio/pop3.mp3'),
    HORN: new Audio('audio/horn-done.mp3')
}
LEFT_BTN.addEventListener('click', () => {
    timeline().to('.cover', {
        x: -1000, duration: 1,
        onComplete: () => {
            set('.cover', {display: 'none'})
            set('body', {overflow: 'auto'})
        }
    })
})

// comic
const height = document.documentElement.clientHeight
window.scroll(0, 0)
const throttle = (func, interval) => {
    let timer

    return (...args) => {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            func.apply(this, [args])
            timer = null
        }, interval)
    }
}

const ICON = document.querySelector('.scroll-icon')
const throttleScroll = throttle(e => {
    if (document.documentElement.scrollTop > 0) {
        ICON.classList.add("not-display")
    } else if (document.documentElement.scrollTop <= 0) {
        ICON.classList.remove("not-display")
    }
    document.querySelectorAll('.move-img-container').forEach((item, index) => {
        if (item.classList.contains("move-flag")) {
            return;
        }
        let topTarget = height - item.clientHeight / 2
        if (index === 0) {

        }
        if (!item.classList.contains("move-done")
            && item.getBoundingClientRect().top < topTarget + 500) {
            timeline().to(item, {
                y: -500, duration: 0.8, opacity: 1,
                onStart: () => {
                    item.classList.add("move-flag")
                },
                onComplete: () => {
                    item.classList.remove("move-flag")
                    item.classList.add("move-done")
                }
            })
        } else if (item.classList.contains("move-done")
            && item.getBoundingClientRect().top > topTarget) {
            timeline().to(item, {
                y: 500, duration: 1, opacity: 0,
                onStart: () => {
                    item.classList.add("move-flag")
                },
                onComplete: () => {
                    item.classList.remove("move-flag")
                    item.classList.remove("move-done")
                }
            })
        }
    });
}, 500)

window.addEventListener('scroll', function (e) {
    throttleScroll(e)
})

// cake
Splitting()
const EYES = document.querySelector('.cake__eyes')
const BLINK = eyes => {
    gsap.set(eyes, { scaleY: 1 })
    if (eyes.BLINK_TL) eyes.BLINK_TL.kill()
    eyes.BLINK_TL = new gsap.timeline({
        delay: Math.floor(Math.random() * 4) + 1,
        onComplete: () => BLINK(eyes),
    })
    eyes.BLINK_TL.to(eyes, {
        duration: 0.05,
        transformOrigin: '50% 50%',
        scaleY: 0,
        yoyo: true,
        repeat: 1,
    })
}
BLINK(EYES)

const FROSTING_TL = () =>
    timeline()
        .to(
            '#frosting',
            {
                scaleX: 1.015,
                duration: 0.25,
            },
            0
        )
        .to(
            '#frosting',
            {
                scaleY: 1,
                duration: 1,
            },
            0
        )
        .to(
            '#frosting',
            {
                duration: 1,
                morphSVG: '.cake__frosting--end',
            },
            0
        )
// Extract to sprinkle
const SPRINKLES_TL = () =>
    timeline().to('.cake__sprinkle', { scale: 1, duration: 0.06, stagger: 0.02 })
// Extract out to your own timeline
const SPIN_TL = () =>
    timeline()
        .set('.cake__frosting-patch', { display: 'block' })
        .to(
            ['.cake__frosting--duplicate', '.cake__sprinkles--duplicate'],
            { x: 0, duration: 1 },
            0
        )
        .to(
            ['.cake__frosting--start', '.cake__sprinkles--initial'],
            { x: 65, duration: 1 },
            0
        )
        .to('.cake__face', { duration: 1, x: -48.82 }, 0)

const flickerSpeed = 0.1
const FLICKER_TL = timeline()
    .to('.candle__flame-outer', {
        duration: flickerSpeed,
        repeat: -1,
        yoyo: true,
        morphSVG: '#flame-outer',
    })
    .to(
        '.candle__flame-inner',
        {
            duration: flickerSpeed,
            repeat: -1,
            yoyo: true,
            morphSVG: '#flame-inner',
        },
        0
    )

const SHAKE_TL = () =>
    timeline({ delay: 0.5 })
        .set('.cake__face', { display: 'none' })
        .set('.cake__face--straining', { display: 'block' })
        .to(
            '.birthday-button',
            {
                onComplete: () => {
                    set('.cake__face--straining', { display: 'none' })
                    set('.cake__face', { display: 'block' })
                },
                // x: 1,
                // y: ,
                // repeat: 13,
                duration: 1.3,
            },
            0
        )
        .to(
            '.cake__candle',
            {
                onComplete: () => {
                    FLICKER_TL.play()
                },
                ease: 'Elastic.easeOut',
                duration: 0.2,
                stagger: 0.2,
                scaleY: 1,
            },
            0.2
        )
const FLAME_TL = () =>
    timeline({})
        .to('.cake__candle', { '--flame': 1, stagger: 0.2, duration: 0.1 })
        .to('body', { '--flame': 1, '--lightness': 5, duration: 0.2, delay: 0.2 })
const LIGHTS_OUT = () =>
    timeline().to('body', {
        delay: 0.5,
        '--lightness': 0,
        duration: 0.1,
        '--glow-saturation': 0,
        '--glow-lightness': 0,
        '--glow-alpha': 1,
        '--transparency-alpha': 1,
    })

const LAST_TL = () => timeline().to('.body', {
    onStart: () => {
        set('.last', {
            display: 'block'
        })
        set(['.cover', '.container'], {
            display: 'none'
        })
        anim();
    }
})
const RESET = () => {
    set('.char', {
        '--hue': () => Math.random() * 360,
        '--char-sat': 0,
        '--char-light': 0,
        x: 0,
        y: 0,
        opacity: 1,
    })
    set('body', {
        '--frosting-hue': 14,
        '--glow-saturation': 50,
        '--glow-lightness': 35,
        '--glow-alpha': 0.4,
        '--transparency-alpha': 0,
        '--flame': 0,
    })
    set('.cake__candle', { '--flame': 0 })
    to('body', {
        '--lightness': 97,
        duration: 0.25,
    })
    // SET THESE
    set('.cake__frosting--end', { opacity: 0 })
    set('#frosting', {
        transformOrigin: '50% 10%',
        scaleX: 0,
        scaleY: 0,
    })
    set('.cake__frosting-patch', { display: 'none' })
    set(['.cake__frosting--duplicate', '.cake__sprinkles--duplicate'], { x: -65 })
    set('.cake__face', { x: -110 })
    set('.cake__face--straining', { display: 'none' })
    set('.cake__sprinkle', {
        '--sprinkle-hue': () => Math.random() * 360,
        scale: 0,
        transformOrigin: '50% 50%',
    })
    // set('.birthday-button', { scale: 0.6, x: 0, y: 0 })
    set('.birthday-button__cake', { display: 'none' })
    set('.cake__candle', { scaleY: 0, transformOrigin: '50% 100%' })
}
RESET()
const MASTER_TL = timeline()
const animStart = () => {
    MASTER_TL
        .set('.birthday-button__cake', { display: 'block' })
        .to('.birthday-button', {
            scale: 1,
            duration: 0.2,
        })
        .to('.char', { '--char-sat': 70, '--char-light': 65, duration: 0.2 }, 0)
        .to('.char', {
            delay: 0.75,
            y: () => gsap.utils.random(-100, -200),
            x: () => gsap.utils.random(-50, 50),
            duration: () => gsap.utils.random(0.5, 1),
        })
        .to('.char', { opacity: 0, duration: 0.25 }, '>-0.5')
        .add(FROSTING_TL())
        .add(SPRINKLES_TL())
        .add(SPIN_TL())
        .add(SHAKE_TL())
        .add(FLAME_TL(), 'FLAME_ON')
        .add(LIGHTS_OUT(), 'LIGHTS_OUT')
        .add(LAST_TL())

    SOUNDS.TUNE.onended = SOUNDS.MATCH.onended = () => MASTER_TL.play()

    MASTER_TL.addPause('FLAME_ON')
    MASTER_TL.addPause('LIGHTS_OUT')
}

BTN.addEventListener('click', () => {
    set('body', {overflow: 'hidden'})
    timeline()
        .to(".move-img-container", 0.8, { opacity: 0})
        .to(".birthday-button", {
            y: -200,
            duration: 1.5
        })
    SOUNDS.BLOW.play()
    SOUNDS.CHEER.play()
    SOUNDS.TUNE.play()
    SOUNDS.MATCH.play()
    SOUNDS.POP1.play()
    SOUNDS.POP2.play()
    SOUNDS.POP3.play()
    SOUNDS.ON.play()
    SOUNDS.HORN.play()
    BTN.setAttribute('disabled', true)
    animStart()
})

// last.js
var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext( '2d' ),

    hw = w / 2, // half-width
    hh = h / 2,

    opts = {
        strings: [ '三七', '生日快乐!' ],
        charSize: 50,
        charSpacing: 60,
        lineHeight: 60,

        cx: w / 2,
        cy: h / 2,

        fireworkPrevPoints: 10,
        fireworkBaseLineWidth: 5,
        fireworkAddedLineWidth: 8,
        fireworkSpawnTime: 200,
        fireworkBaseReachTime: 30,
        fireworkAddedReachTime: 30,
        fireworkCircleBaseSize: 30,
        fireworkCircleAddedSize: 10,
        fireworkCircleBaseTime: 30,
        fireworkCircleAddedTime: 30,
        fireworkCircleFadeBaseTime: 10,
        fireworkCircleFadeAddedTime: 5,
        fireworkBaseShards: 5,
        fireworkAddedShards: 5,
        fireworkShardPrevPoints: 3,
        fireworkShardBaseVel: 4,
        fireworkShardAddedVel: 2,
        fireworkShardBaseSize: 3,
        fireworkShardAddedSize: 3,
        gravity: .1,
        upFlow: -.1,
        letterContemplatingWaitTime: 360,
        balloonSpawnTime: 20,
        balloonBaseInflateTime: 10,
        balloonAddedInflateTime: 10,
        balloonBaseSize: 30,
        balloonAddedSize: 20,
        balloonBaseVel: .4,
        balloonAddedVel: .4,
        balloonBaseRadian: -( Math.PI / 2 - .5 ),
        balloonAddedRadian: -1,
    },
    calc = {
        totalWidth: opts.charSpacing * Math.max( opts.strings[0].length, opts.strings[1].length )
    },

    Tau = Math.PI * 2,
    TauQuarter = Tau / 4,

    letters = [];

ctx.font = opts.charSize + 'px Verdana';

function Letter( char, x, y ){
    this.char = char;
    this.x = x;
    this.y = y;

    this.dx = -ctx.measureText( char ).width / 2;
    this.dy = +opts.charSize / 2;

    this.fireworkDy = this.y - hh;

    var hue = x / calc.totalWidth * 360;

    this.color = 'hsl(hue,80%,50%)'.replace( 'hue', hue );
    this.lightAlphaColor = 'hsla(hue,80%,light%,alp)'.replace( 'hue', hue );
    this.lightColor = 'hsl(hue,80%,light%)'.replace( 'hue', hue );
    this.alphaColor = 'hsla(hue,80%,50%,alp)'.replace( 'hue', hue );

    this.reset();
}
Letter.prototype.reset = function(){

    this.phase = 'firework';
    this.tick = 0;
    this.spawned = false;
    this.spawningTime = opts.fireworkSpawnTime * Math.random() |0;
    this.reachTime = opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random() |0;
    this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
    this.prevPoints = [ [ 0, hh, 0 ] ];
}
Letter.prototype.step = function(){

    if( this.phase === 'firework' ){

        if( !this.spawned ){

            ++this.tick;
            if( this.tick >= this.spawningTime ){

                this.tick = 0;
                this.spawned = true;
            }

        } else {

            ++this.tick;

            var linearProportion = this.tick / this.reachTime,
                armonicProportion = Math.sin( linearProportion * TauQuarter ),

                x = linearProportion * this.x,
                y = hh + armonicProportion * this.fireworkDy;

            if( this.prevPoints.length > opts.fireworkPrevPoints )
                this.prevPoints.shift();

            this.prevPoints.push( [ x, y, linearProportion * this.lineWidth ] );

            var lineWidthProportion = 1 / ( this.prevPoints.length - 1 );

            for( var i = 1; i < this.prevPoints.length; ++i ){

                var point = this.prevPoints[ i ],
                    point2 = this.prevPoints[ i - 1 ];

                ctx.strokeStyle = this.alphaColor.replace( 'alp', i / this.prevPoints.length );
                ctx.lineWidth = point[ 2 ] * lineWidthProportion * i;
                ctx.beginPath();
                ctx.moveTo( point[ 0 ], point[ 1 ] );
                ctx.lineTo( point2[ 0 ], point2[ 1 ] );
                ctx.stroke();

            }

            if( this.tick >= this.reachTime ){

                this.phase = 'contemplate';

                this.circleFinalSize = opts.fireworkCircleBaseSize + opts.fireworkCircleAddedSize * Math.random();
                this.circleCompleteTime = opts.fireworkCircleBaseTime + opts.fireworkCircleAddedTime * Math.random() |0;
                this.circleCreating = true;
                this.circleFading = false;

                this.circleFadeTime = opts.fireworkCircleFadeBaseTime + opts.fireworkCircleFadeAddedTime * Math.random() |0;
                this.tick = 0;
                this.tick2 = 0;

                this.shards = [];

                var shardCount = opts.fireworkBaseShards + opts.fireworkAddedShards * Math.random() |0,
                    angle = Tau / shardCount,
                    cos = Math.cos( angle ),
                    sin = Math.sin( angle ),

                    x = 1,
                    y = 0;

                for( var i = 0; i < shardCount; ++i ){
                    var x1 = x;
                    x = x * cos - y * sin;
                    y = y * cos + x1 * sin;

                    this.shards.push( new Shard( this.x, this.y, x, y, this.alphaColor ) );
                }
            }

        }
    } else if( this.phase === 'contemplate' ){

        ++this.tick;

        if( this.circleCreating ){

            ++this.tick2;
            var proportion = this.tick2 / this.circleCompleteTime,
                armonic = -Math.cos( proportion * Math.PI ) / 2 + .5;

            ctx.beginPath();
            ctx.fillStyle = this.lightAlphaColor.replace( 'light', 50 + 50 * proportion ).replace( 'alp', proportion );
            ctx.beginPath();
            ctx.arc( this.x, this.y, armonic * this.circleFinalSize, 0, Tau );
            ctx.fill();

            if( this.tick2 > this.circleCompleteTime ){
                this.tick2 = 0;
                this.circleCreating = false;
                this.circleFading = true;
            }
        } else if( this.circleFading ){

            ctx.fillStyle = this.lightColor.replace( 'light', 70 );
            ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );

            ++this.tick2;
            var proportion = this.tick2 / this.circleFadeTime,
                armonic = -Math.cos( proportion * Math.PI ) / 2 + .5;

            ctx.beginPath();
            ctx.fillStyle = this.lightAlphaColor.replace( 'light', 100 ).replace( 'alp', 1 - armonic );
            ctx.arc( this.x, this.y, this.circleFinalSize, 0, Tau );
            ctx.fill();

            if( this.tick2 >= this.circleFadeTime )
                this.circleFading = false;

        } else {

            ctx.fillStyle = this.lightColor.replace( 'light', 70 );
            ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );
        }

        for( var i = 0; i < this.shards.length; ++i ){

            this.shards[ i ].step();

            if( !this.shards[ i ].alive ){
                this.shards.splice( i, 1 );
                --i;
            }
        }

        if( this.tick > opts.letterContemplatingWaitTime ){

            this.phase = 'balloon';

            this.tick = 0;
            this.spawning = true;
            this.spawnTime = opts.balloonSpawnTime * Math.random() |0;
            this.inflating = false;
            this.inflateTime = opts.balloonBaseInflateTime + opts.balloonAddedInflateTime * Math.random() |0;
            this.size = opts.balloonBaseSize + opts.balloonAddedSize * Math.random() |0;

            var rad = opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random(),
                vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random();

            this.vx = Math.cos( rad ) * vel;
            this.vy = Math.sin( rad ) * vel;
        }
    } else if( this.phase === 'balloon' ){

        ctx.strokeStyle = this.lightColor.replace( 'light', 80 );

        if( this.spawning ){

            ++this.tick;
            ctx.fillStyle = this.lightColor.replace( 'light', 70 );
            ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );

            if( this.tick >= this.spawnTime ){
                this.tick = 0;
                this.spawning = false;
                this.inflating = true;
            }
        } else if( this.inflating ){

            ++this.tick;

            var proportion = this.tick / this.inflateTime,
                x = this.cx = this.x,
                y = this.cy = this.y - this.size * proportion;

            ctx.fillStyle = this.alphaColor.replace( 'alp', proportion );
            ctx.beginPath();
            generateBalloonPath( x, y, this.size * proportion );
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo( x, y );
            ctx.lineTo( x, this.y );
            ctx.stroke();

            ctx.fillStyle = this.lightColor.replace( 'light', 70 );
            ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );

            if( this.tick >= this.inflateTime ){
                this.tick = 0;
                this.inflating = false;
            }

        } else {

            this.cx += this.vx;
            this.cy += this.vy += opts.upFlow;

            ctx.fillStyle = this.color;
            ctx.beginPath();
            generateBalloonPath( this.cx, this.cy, this.size );
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo( this.cx, this.cy );
            ctx.lineTo( this.cx, this.cy + this.size );
            ctx.stroke();

            ctx.fillStyle = this.lightColor.replace( 'light', 70 );
            ctx.fillText( this.char, this.cx + this.dx, this.cy + this.dy + this.size );

            if( this.cy + this.size < -hh || this.cx < -hw || this.cy > hw  )
                this.phase = 'done';

        }
    }
}
function Shard( x, y, vx, vy, color ){

    var vel = opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();

    this.vx = vx * vel;
    this.vy = vy * vel;

    this.x = x;
    this.y = y;

    this.prevPoints = [ [ x, y ] ];
    this.color = color;

    this.alive = true;

    this.size = opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random();
}
Shard.prototype.step = function(){

    this.x += this.vx;
    this.y += this.vy += opts.gravity;

    if( this.prevPoints.length > opts.fireworkShardPrevPoints )
        this.prevPoints.shift();

    this.prevPoints.push( [ this.x, this.y ] );

    var lineWidthProportion = this.size / this.prevPoints.length;

    for( var k = 0; k < this.prevPoints.length - 1; ++k ){

        var point = this.prevPoints[ k ],
            point2 = this.prevPoints[ k + 1 ];

        ctx.strokeStyle = this.color.replace( 'alp', k / this.prevPoints.length );
        ctx.lineWidth = k * lineWidthProportion;
        ctx.beginPath();
        ctx.moveTo( point[ 0 ], point[ 1 ] );
        ctx.lineTo( point2[ 0 ], point2[ 1 ] );
        ctx.stroke();

    }

    if( this.prevPoints[ 0 ][ 1 ] > hh )
        this.alive = false;
}
function generateBalloonPath( x, y, size ){

    ctx.moveTo( x, y );
    ctx.bezierCurveTo( x - size / 2, y - size / 2,
        x - size / 4, y - size,
        x,            y - size );
    ctx.bezierCurveTo( x + size / 4, y - size,
        x + size / 2, y - size / 2,
        x,            y );
}

function anim(){

    window.requestAnimationFrame( anim );

    ctx.fillStyle = '#111';
    ctx.fillRect( 0, 0, w, h );

    ctx.translate( hw, hh );

    var done = true;
    for( var l = 0; l < letters.length; ++l ){

        letters[ l ].step();
        if( letters[ l ].phase !== 'done' )
            done = false;
    }

    ctx.translate( -hw, -hh );

    if( done )
        for( var l = 0; l < letters.length; ++l )
            letters[ l ].reset();
}

for( var i = 0; i < opts.strings.length; ++i ){
    for( var j = 0; j < opts.strings[ i ].length; ++j ){
        letters.push( new Letter( opts.strings[ i ][ j ],
            j * opts.charSpacing + opts.charSpacing / 2 - opts.strings[ i ].length * opts.charSize / 2,
            i * opts.lineHeight + opts.lineHeight / 2 - opts.strings.length * opts.lineHeight / 2 ) );
    }
}

window.addEventListener( 'resize', function(){

    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;

    hw = w / 2;
    hh = h / 2;

    ctx.font = opts.charSize + 'px Verdana';
})