import { AdvancedDynamicTexture, Control, SelectionPanel, SliderGroup, RadioGroup } from '@babylonjs/gui';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { deg2Rad, rad2Deg } from '../Utils';
import { setIsPerspectiveView, setClipPlaneH, setClipPlaneV, setSliderFov } from '../redux/uiSlice';

interface UIElementsProps {
    guiTexture: AdvancedDynamicTexture;
  }

const fovDisplayVal = (value: number) => {
    return parseFloat(rad2Deg(value).toFixed(2));
}
const UIElements: React.FC<UIElementsProps> = ({guiTexture}) => {
    const dispatch = useDispatch<AppDispatch>();

    const sceneClippingH = useSelector((state: RootState) => state.ui.clipPlaneH);
    const sceneClippingV = useSelector((state: RootState) => state.ui.clipPlaneV);
    const fieldOfView = useSelector((state: RootState) => state.ui.fieldOfView);
    const isPerspectiveView = useSelector((state: RootState) => state.ui.isPerspectiveView);
    const selectedMenuItem = useSelector((state: RootState) => state.menu.selectedMenu);
    console.log(selectedMenuItem);

    useEffect(() => {
        if(selectedMenuItem === "View") {
            // base panel
            const panel = new SelectionPanel("View Panel");
            panel.width = 0.17;
            panel.height = 0.47;
            panel.paddingTopInPixels = 50;
            panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
            panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        
            // Radio group for perspective and orthographic views
            const viewRadioGroup = new RadioGroup("View Mode");
            viewRadioGroup.addRadio("Perspective View", () => {
                dispatch(setIsPerspectiveView(true));
            }, isPerspectiveView);

            viewRadioGroup.addRadio("Orthographic View", () => {
                dispatch(setIsPerspectiveView(false));
            }, !isPerspectiveView);
        
            // Slider to set the field of view angle - works only with perspective view
            const fovSliderGroup = new SliderGroup("Field of View");
            fovSliderGroup.addSlider("Perspective FOV", (value: number) => {
                dispatch(setSliderFov(value));
            }, "°", deg2Rad(10), deg2Rad(120), fieldOfView, fovDisplayVal);
            

            // Slider to set horizontal and vertical clipping planes
            const clipGroup = new SliderGroup("Clipping");
            clipGroup.addSlider("Horizontal Clip", (value: number) => {
                dispatch(setClipPlaneH(value));
            }, "", -10, 10, sceneClippingH);

            clipGroup.addSlider("Vertical Clip", (value: number) => {
                dispatch(setClipPlaneV(value));
            }, "", -10, 10, sceneClippingV);

            panel.addGroup(viewRadioGroup);
            panel.addGroup(fovSliderGroup);
            panel.addGroup(clipGroup);
        
            guiTexture.addControl(panel);
        
            return () => {
                guiTexture.removeControl(panel);
            };


        }

    }, [dispatch, guiTexture, isPerspectiveView, fieldOfView, sceneClippingH, sceneClippingV]);

    return null;

};





export default UIElements;