namespace SpriteKind {
    export const NPC = SpriteKind.create()
    export const Hitbox = SpriteKind.create()
}
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
sprites.onOverlap(SpriteKind.Hitbox, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Hitbox)
    if (Player1.image.equals(assets.image`IdleDay1`)) {
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.ashes, 1000)
    }
    if (Player1.image.equals(assets.image`IdleNight1`)) {
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.halo, 1000)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    TimeOfDay()
})
function TimeOfDay () {
    if (scene.backgroundImage().equals(assets.image`ForegroundBG`) || scene.backgroundImage().equals(assets.image`BackgroundBG`)) {
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
    if (scene.backgroundImage().equals(assets.image`Level1FGBG`) || scene.backgroundImage().equals(assets.image`Level1BGBG`)) {
        if (scene.backgroundImage().equals(assets.image`Level1FGBG`)) {
            scene.setBackgroundImage(assets.image`Level1BGBG`)
            tiles.setCurrentTilemap(tilemap`Level 1 - Night`)
            Player1.setImage(assets.image`IdleNight1`)
            Player1.startEffect(effects.halo, 1000)
            DayNightModifier = 0.85
        } else {
            scene.setBackgroundImage(assets.image`Level1FGBG`)
            tiles.setCurrentTilemap(tilemap`Level 1 - Day`)
            Player1.setImage(assets.image`IdleDay1`)
            Player1.startEffect(effects.ashes, 1000)
            DayNightModifier = 1.5
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Attack = sprites.createProjectileFromSprite(assets.image`Attack`, Player1, 0, 0)
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    if (Player1.image.equals(assets.image`IdleDay1`)) {
        speed += AccelerationValueDay
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`GoalTile`, function (sprite, location) {
    if (scene.backgroundImage().equals(assets.image`ForegroundBG`) || scene.backgroundImage().equals(assets.image`BackgroundBG`)) {
        scene.setBackgroundImage(assets.image`Level1FGBG`)
        tiles.setCurrentTilemap(tilemap`Level 1 - Day`)
        tiles.placeOnTile(Player1, tiles.getTileLocation(1, 102))
        sprites.destroy(Tutorial)
        info.changeScoreBy(1000)
        tiles.placeOnTile(Shopkeeper, tiles.getTileLocation(3, 102))
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
    if (scene.backgroundImage().equals(assets.image`ForegroundBG`) || scene.backgroundImage().equals(assets.image`BackgroundBG`)) {
        tiles.placeOnTile(Player1, tiles.getTileLocation(59, 55))
    }
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
    if (Player1.overlapsWith(Shopkeeper)) {
        game.setDialogFrame(assets.image`SpeechBG`)
        game.showLongText("Howdy! I'm the shopkeeper! I'm not sure why, but I'll be magically following you around to offer upgrades! :)", DialogLayout.Full)
    }
}
function setRunningVariables () {
    speed = 80
    AccelerationValueDay = 10
    walkSpeed = 80
}
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    if (Player1.image.equals(assets.image`IdleDay1`)) {
        speed += AccelerationValueDay
    }
})
let walkSpeed = 0
let AccelerationValueDay = 0
let speed = 0
let DayNightModifier = 0
let JumpCount = 0
let Player1: Sprite = null
let Tutorial: Sprite = null
let Attack: Sprite = null
let Shopkeeper: Sprite = null
Shopkeeper = sprites.create(assets.image`Shopkeeper`, SpriteKind.NPC)
Attack = sprites.create(assets.image`Attack`, SpriteKind.Hitbox)
let statusbar = statusbars.create(30, 3, StatusBarKind.Health)
statusbar.value = 200
game.splash("You seem to appear in a random forest in the middle of nowhere. You are unsure of where you are, but there seems to be a mysterious lady with you.")
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
info.setScore(0)
forever(function () {
    if (statusbar.value < 200) {
        pause(400)
        statusbar.value += 6
        pause(100)
    }
    statusbar.setColor(7, 2, 4)
    statusbar.setLabel("HP", 15)
    statusbar.positionDirection(CollisionDirection.Top)
    statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    if (Player1.tileKindAt(TileDirection.Center, sprites.builtin.brick) || Player1.tileKindAt(TileDirection.Center, sprites.dungeon.floorDark0)) {
        game.splash("You're gonna teleport back if you try that again.")
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
