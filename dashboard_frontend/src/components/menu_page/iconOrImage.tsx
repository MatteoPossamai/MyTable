function IconOrImage(props : {icon_plates: number, selectedIcon: number, changeCategoryIcon: any, auth:any,
        imagePopup: any, setImagePopup: any}){ 
    let {icon_plates, selectedIcon, changeCategoryIcon, auth, setImagePopup} = props;
    return (
        <>
            <label>Icon</label>
                    <section className="iconsChoice">
                        {Array.from(Array(icon_plates).keys()).map((icon) => {
                            return (
                                <img key={icon} src={`/plates/food_${icon+1}.svg`} alt="Category cover"
                                onClick={(e) => {changeCategoryIcon(e, icon);}} className="foodIcon"
                                style={{backgroundColor: icon === selectedIcon ? "#530F26" : "white" }} />
                            )
                        })
                        }
            </section>

            <button type="button" className="photos" style={{display: auth.image_menu ? "block" : "none"}}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setImagePopup(true);
                }}>Usa una delle tue foto</button>
        </>
    )
}

export default IconOrImage;