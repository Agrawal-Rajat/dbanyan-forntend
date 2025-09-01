import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  TextInput,
  Group,
  Text,
  Title,
  Modal,
  Stack,
  Badge,
  ScrollArea,
} from "@mantine/core";
import { IconPencil, IconTrash, IconPlus } from "@tabler/icons-react";
import GetCategoryData from "../../API_FILES/category/GetCategoryData";
import CustomLoader from "../../Loader/CustomLoader";
import EditCategory from "../../API_FILES/category/EditCategory";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import AddCategoryData from "../../API_FILES/category/AddCategoryData";
import DeleteCategoryData from "../../API_FILES/category/DeleteCategoryData";
export default function CategoryManagement() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Moringa Powder", description: "All moringa powder products" },
    { id: 2, name: "Moringa Paste", description: "Paste-based moringa products" },
    { id: 3, name: "Supplements", description: "Health supplements and capsules" },
  ]);
  const [loading,setloading]=useState(false)
  
    async function getcategories(){
        setloading(true)
        const res=await GetCategoryData()
        // console.log(res)
        if(res?.data){
            setCategories(res?.data)
            setloading(false)
        }
        else{
            setloading(false)
        }
    }

  useEffect(()=>{
    getcategories()
  },[])
  

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "",id:"" });

  const handleAdd = async() => {
    setloading(true)
    setCategories([...categories, { id: Date.now(), ...formData }]);
    // setFormData({ name: "", description: "" });
    // console.log(formData)
    const res=await AddCategoryData(formData)
    // console.log(res)
    if(res?.message==="Category Created"){
        setloading(false)
        toast.success(res?.message,{
            position:"top-center"
        })
        setTimeout(() => {
        setOpenAdd(false);
        }, 1000);

    }
    else{
        setloading(false)
    setOpenAdd(false);

    }
  };

  const handleEdit = async() => {
        setloading(true)
    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategory.id ? { ...cat, ...formData } : cat
      )
    );
    // console.log(formData)
    const res=await EditCategory(formData)
    // console.log(res)
    if(res?.message==="Category Updated"){
        setloading(false)
        toast.success(res?.message,{
            position:"top-center"
        })
        setTimeout(() => {
    setOpenEdit(false);
            
        }, 1000);
    }
    else{
        setloading(false)
        setOpenEdit(false);
    }
  };

  const handleDelete = async() => {
    setloading(true)
    setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
    // console.log(selectedCategory.id)
    const res=await DeleteCategoryData(selectedCategory.id)
    if(res?.message=="Category Deleted"){
        setloading(false)
        toast.success(res?.message,{
            position:"top-center"
        })
        setTimeout(() => {
        setOpenDelete(false);
        }, 1000);
    }
    else{
        setloading(false)
    setOpenDelete(false);
    }
  };

  return (
    <div style={{ padding: "32px" }}>
      {/* Header */}
      {
        loading && <CustomLoader/>
      }
      <ToastContainer/>
      <Group position="apart" mb="xl">
        <Title order={2} c="green">
          Category Management
        </Title>
        <Button
          color="green"
          leftIcon={<IconPlus size={16} />}
          onClick={() => setOpenAdd(true)}
        >
          Add Category
        </Button>
      </Group>

      {/* Categories Grid */}
      <ScrollArea style={{ height: "70vh" }}>
        <Stack spacing="md">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              shadow="sm"
              radius="md"
              withBorder
              p="lg"
              style={{
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Group position="apart" align="center">
                <Stack spacing={2}>
                  <Text fw={600} size="lg">
                    {cat.name}
                  </Text>
                  
                </Stack>
                <Group spacing="xs">
                  <Button
                    variant="light"
                    color="blue"
                    size="xs"
                    leftIcon={<IconPencil size={16} />}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setFormData({
                        name: cat.name,
                        description: cat.description,
                        id:cat.id
                      });
                      setOpenEdit(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="light"
                    color="red"
                    size="xs"
                    leftIcon={<IconTrash size={16} />}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOpenDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>
      </ScrollArea>

      {/* Add Modal */}
      <Modal
        opened={openAdd}
        onClose={() => setOpenAdd(false)}
        title="Add Category"
        centered
      >
        <Stack>
          <TextInput
            label="Category Name"
            placeholder="Enter category name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.currentTarget.value })
            }
          />
          
          <Button color="green" fullWidth mt="md" onClick={handleAdd}>
            Save
          </Button>
        </Stack>
      </Modal>

      {/* Edit Modal */}
      <Modal
        opened={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Edit Category"
        centered
      >
        <Stack>
          <TextInput
            label="Category Name"
            placeholder="Enter category name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.currentTarget.value })
            }
          />
          
          <Button color="green" fullWidth mt="md" onClick={handleEdit}>
            Update
          </Button>
        </Stack>
      </Modal>

      {/* Delete Modal */}
      <Modal
        opened={openDelete}
        onClose={() => setOpenDelete(false)}
        title="Delete Category"
        centered
      >
        <Stack spacing="md">
          <Text>
            Are you sure you want to delete <b>{selectedCategory?.name}</b>?
          </Text>
          <Group position="right">
            <Button variant="default" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}
