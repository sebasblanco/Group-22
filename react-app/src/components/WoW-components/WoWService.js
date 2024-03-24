
class WoWService {
    async downloadCharacterMediaAsset(mediaUrl) {
        const tmpName = `${tmp.tmpNameSync()}.png`;
        const response = await fetch(mediaUrl);
        await new Promise((resolve, reject) => {
            const fileWriteStream = fs.createWriteStream(tmpName);
            response.body.pipe(fileWriteStream)
                .on("finish", () => {
                    resolve(tmpName);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
        return tmpName;
    }

    async generateImage(character, characterMedia) {
        const { inset: bustUrl } = characterMedia;
        const tmpBustPath = await this.downloadCharacterMediaAsset(bustUrl);

        return new Promise((resolve, reject) => {
            gm(BACKGROUND_IMAGE_EMPTY_PATH)
                .in("-page", "+2+2")
                .in(tmpBustPath)
                .in("-page", "+0+0")
                .in(backgroundImage)
                .mosaic()
                .font(FONT_MERRIWEATHER_BOLD_PATH)
                .fontSize("30")
                .fill("#deaa00")
                .drawText(220, 40, character.name)
                .font(FONT_MERRIWEATHER_REGULAR_PATH)
                .fontSize("12")
                .fill("#888888")
                .drawText(
                    220,
                    65,
                    identityString
                )
                .drawText(
                    220,
                    85,
                    itemLevelString
                )
                .drawText(
                    220,
                    105,
                    achievementPointsString
                )
                .toBuffer("PNG", (err, buffer) => {
                    fs.unlinkSync(tmpBustPath);
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            filename: `${slug(character.name)}-${character.realm.slug}.png`.toLowerCase(),
                            data: buffer
                        });
                    }
                });
        });
    }
}

module.exports = WoWService;