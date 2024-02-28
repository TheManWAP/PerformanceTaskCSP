namespace SpriteKind {
    export const NPC = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (!(Player1.isHittingTile(CollisionDirection.Top))) {
        JumpCount = 0
    }
    if (Player1.isHittingTile(CollisionDirection.Left) || Player1.isHittingTile(CollisionDirection.Right)) {
        Player1.vy = 20
        JumpCount = 1
    }
})
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`PortalFG`, function (sprite, location) {
    tiles.placeOnTile(Player1, tiles.getTileLocation(59, 55))
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    TalkToNPC()
})
function TalkToNPC () {
    if (Player1.overlapsWith(Tutorial)) {
        game.setDialogFrame(assets.image`SpeechBG`)
        game.showLongText("It is a pleasure to meet your acquaintance. My name is Anna.", DialogLayout.Full)
        game.showLongText("We do not have much time. The world id being torn apart by a dark energy.", DialogLayout.Full)
        game.showLongText("I have granted you the ability to transform, but only during nighttime.", DialogLayout.Full)
        game.showLongText("Using the (B) Button, you can fast-forward between day and night, each with its own perks/debuffs.", DialogLayout.Full)
        game.showLongText("During the daytime, you are much faster, but lose an extra air jump and have weaker attacks.", DialogLayout.Full)
        game.showLongText("During the nighttime, some of that speed is traded for an extra air jump and stronger attacks.", DialogLayout.Full)
        game.showLongText("There is an obstacle course to help you learn your newfound powers.", DialogLayout.Full)
        game.showLongText("The fate of the world rests in your hands. Good luck, hero.", DialogLayout.Full)
    }
}
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
let Tutorial: Sprite = null
game.splash("You seem to appear in a random plane. You are unsure of where you are, but there seems to be a mysterious lady with you.")
game.splash("Press (DOWN) to talk to the mysterious lady behind you...")
Tutorial = sprites.create(assets.image`TutorialLady`, SpriteKind.NPC)
setRunningVariables()
Player1 = sprites.create(assets.image`IdleDay1`, SpriteKind.Player)
Player1.ay = 350
scene.setBackgroundImage(assets.image`ForegroundBG`)
scene.cameraFollowSprite(Player1)
tiles.setCurrentTilemap(tilemap`Start Level - Day`)
tiles.placeOnTile(Player1, tiles.getTileLocation(8, 103))
JumpCount = 0
DayNightModifier = 1.5
tiles.placeOnTile(Tutorial, tiles.getTileLocation(5, 105))
forever(function () {
    if (Player1.tileKindAt(TileDirection.Center, sprites.builtin.brick) || Player1.tileKindAt(TileDirection.Center, sprites.dungeon.floorDark0)) {
        game.splash("Forgot to mention: if you're inside of a tile, you start at the beginning again. Good luck! :)")
        tiles.placeOnTile(Player1, tiles.getTileLocation(8, 103))
    }
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
