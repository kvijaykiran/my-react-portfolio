import { AdvancedDynamicTexture, SelectionPanel, RadioGroup, StackPanel, TextBlock, Slider } from '@babylonjs/gui';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
//import { rad2Deg } from '../Utils';
import { setIsPerspectiveView, setClipPlaneH, setClipPlaneV, setClipPlaneF, setSliderFov } from '../redux/uiSlice';

interface UIElementsProps {
    guiTexture: AdvancedDynamicTexture;
  }

// const formattedDisplayVal = (value: number) => {
//     return parseFloat(rad2Deg(value).toFixed(2));
// }

const UIElements: React.FC<UIElementsProps> = ({guiTexture}) => {
    const dispatch = useDispatch<AppDispatch>();

    const sceneClippingH = useSelector((state: RootState) => state.ui.clipPlaneH);
    const sceneClippingV = useSelector((state: RootState) => state.ui.clipPlaneV);
    const sceneClippingF = useSelector((state: RootState) => state.ui.clipPlaneF);
    const fieldOfView = useSelector((state: RootState) => state.ui.fieldOfView);
    const isPerspectiveView = useSelector((state: RootState) => state.ui.isPerspectiveView);
    const selectedMenuItem = useSelector((state: RootState) => state.menu.selectedMenu);
    //console.log(selectedMenuItem);

    useEffect(() => {
        if(selectedMenuItem === "View") {
            // base panel
            const panel = new SelectionPanel("View Panel");
        
            // Radio group for perspective and orthographic views
            const viewRadioGroup = new RadioGroup("View Mode");
            viewRadioGroup.addRadio("Perspective View", () => {
                dispatch(setIsPerspectiveView(true));
            }, isPerspectiveView);

            viewRadioGroup.addRadio("Orthographic View", () => {
                dispatch(setIsPerspectiveView(false));
            }, !isPerspectiveView);
        
            const mainStackPanel = new StackPanel();
            mainStackPanel.width = "220px";
            mainStackPanel.height = "300px";
            mainStackPanel.isVertical = true;
            mainStackPanel.top = "150px";
            mainStackPanel.left = "10px";
            mainStackPanel.verticalAlignment = StackPanel.VERTICAL_ALIGNMENT_TOP;
            mainStackPanel.horizontalAlignment = StackPanel.HORIZONTAL_ALIGNMENT_LEFT;

            const createSliderGroup = (label: string, min: number, max: number, value: number, onChange: (value: number) => void) => {
                const sliderGroup = new StackPanel();
                sliderGroup.height = "60px";
                sliderGroup.width = "100%";
                sliderGroup.paddingBottom = "10px";

                const text = new TextBlock();
                text.text = `${label}: ${value}`;
                text.height = "30px";
                text.width = "200px";
                text.paddingBottom = "10px";
                text.fontSize = "16";

                const slider = new Slider();
                slider.minimum = min;
                slider.maximum = max;
                slider.value = value;
                slider.height = "15px";
                slider.width = "200px";
                slider.color = "#fff";
                slider.highlightColor = "white";
                slider.thumbColor = "tomato";
                slider.onValueChangedObservable.add((val) => {
                    text.text = `${label}: ${val}`;
                    onChange(val);
                });

                sliderGroup.addControl(text);
                sliderGroup.addControl(slider);

                return sliderGroup;
            };

            const clipHGroup = createSliderGroup("Horizontal clipping", -10, 10, sceneClippingH, (value) => dispatch(setClipPlaneH(value)));
            const clipVGroup = createSliderGroup("Vertical clipping", -10, 10, sceneClippingV, (value) => dispatch(setClipPlaneV(value)));
            const clipFGroup = createSliderGroup("Front clipping", -10, 10, sceneClippingF, (value) => dispatch(setClipPlaneF(value)));
            mainStackPanel.addControl(clipHGroup);
            mainStackPanel.addControl(clipVGroup);
            mainStackPanel.addControl(clipFGroup);

            if(isPerspectiveView)
            {
                const fovSliderGroup = createSliderGroup("FOV (°)", 10, 120, fieldOfView, (value) => dispatch(setSliderFov(value)));
                mainStackPanel.addControl(fovSliderGroup);
            }


            panel.addGroup(viewRadioGroup);
            panel.addControl(mainStackPanel);
            guiTexture.addControl(panel);

            panel.width = "250px";
            panel.height = "400px";
            panel.top = "45px";
            // panel.left = "-5px";
            panel.verticalAlignment = StackPanel.VERTICAL_ALIGNMENT_TOP;
            panel.horizontalAlignment = StackPanel.HORIZONTAL_ALIGNMENT_RIGHT;

            return () => {
                guiTexture.removeControl(panel);
            }

        }

    }, [dispatch, guiTexture, isPerspectiveView, fieldOfView, sceneClippingH]);

    return null;

};





export default UIElements;