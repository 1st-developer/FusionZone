import { Button } from "./ui/button"
import "../Styles/createPosts.scss"
import { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function CreatePost() {

     const fileInputRef = useRef<HTMLInputElement>(null);
      const [img, setImg] = useState("");
  
      const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const newImage = URL.createObjectURL(e.target.files[0]);
        setImg(newImage); 
      }
    }; 

  return (
    <div className="hole">
      <form>
      <div className="width">
        <div className="image">
          {img ? <img src={img} />: <h2>no image</h2>}
          <input type="file" accept="image/*" ref={fileInputRef} onChange={upload} style={{ display: "none" }} />
          <Button type="button" onClick={() => fileInputRef.current?.click()}>Upload</Button>
        </div>
        <div className="add">
          <input type="text" placeholder="add title" />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a state" />
              </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pick up on of three state</SelectLabel>
                  <SelectItem value="apple">Pending</SelectItem>
                <SelectItem value="banana">Complete</SelectItem>
              <SelectItem value="blueberry">Under update</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button type="button">Save</Button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default CreatePost