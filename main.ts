controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    JumpCount += 1
    if (Player1.image.equals(assets.image`IdleDay1`)) {
        if (JumpCount == 1) {
            Player1.vy = -157
            pause(200)
        }
        if (JumpCount == 2) {
            Player1.vy = -150
        }
    }
    if (Player1.image.equals(assets.image`IdleNight1`)) {
        if (JumpCount == 1) {
            Player1.vy = -150
            pause(200)
        }
        if (JumpCount == 2) {
            Player1.vy = -145
            pause(200)
        }
        if (JumpCount == 3) {
            Player1.vy = -120
            pause(200)
        }
    }
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (!(Player1.isHittingTile(CollisionDirection.Top))) {
        JumpCount = 0
    }
    if (Player1.isHittingTile(CollisionDirection.Left) || Player1.isHittingTile(CollisionDirection.Right)) {
        Player1.vy = 20
        JumpCount = 1
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    TimeOfDay()
})
function TimeOfDay () {
    if (scene.backgroundImage().equals(assets.image`ForegroundBG`)) {
        scene.setBackgroundImage(assets.image`BackgroundBG`)
        tiles.setCurrentTilemap(tilemap`Start Level - Night`)
        Player1.setImage(assets.image`IdleNight1`)
        Player1.startEffect(effects.halo, 1000)
        DayNightModifier = 0.85
    } else {
        scene.setBackgroundImage(assets.image`ForegroundBG`)
        tiles.setCurrentTilemap(tilemap`Start Level - Day`)
        Player1.setImage(assets.image`IdleDay1`)
        Player1.startEffect(effects.ashes, 1000)
        DayNightModifier = 1.5
    }
}
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    if (Player1.image.equals(assets.image`IdleDay1`)) {
        speed += AccelerationValueDay
    }
    if (Player1.image.equals(assets.image`IdleNight1`)) {
        speed += AccelerationValueNight
    }
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (Player1.image.equals(assets.image`IdleDay1`) || Player1.image.equals(assets.image`IdleNight1`)) {
        speed = walkSpeed
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (Player1.image.equals(assets.image`IdleDay1`) || Player1.image.equals(assets.image`IdleNight1`)) {
        speed = walkSpeed
    }
})
function setRunningVariables () {
    speed = 80
    AccelerationValueDay = 10
    walkSpeed = 80
    AccelerationValueNight = 5
}
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    if (Player1.image.equals(assets.image`IdleDay1`)) {
        speed += AccelerationValueDay
    }
    if (Player1.image.equals(assets.image`IdleNight1`)) {
        speed += AccelerationValueNight
    }
})
let walkSpeed = 0
let AccelerationValueNight = 0
let AccelerationValueDay = 0
let speed = 0
let DayNightModifier = 0
let JumpCount = 0
let Player1: Sprite = null
setRunningVariables()
Player1 = sprites.create(assets.image`IdleDay1`, SpriteKind.Player)
Player1.ay = 350
scene.setBackgroundImage(assets.image`ForegroundBG`)
scene.cameraFollowSprite(Player1)
tiles.setCurrentTilemap(tilemap`Start Level - Day`)
tiles.placeOnTile(Player1, tiles.getTileLocation(8, 103))
JumpCount = 0
DayNightModifier = 1.5
forever(function () {
    if (Player1.image.equals(assets.image`IdleDay1`)) {
        if (speed >= 120) {
            speed = 120
        }
        controller.moveSprite(Player1, speed * DayNightModifier, 0)
    }
    if (Player1.image.equals(assets.image`IdleNight1`)) {
        if (speed >= 84) {
            speed = 84
        }
        controller.moveSprite(Player1, speed * DayNightModifier, 0)
    }
})
