<template>
    <div>
        <label>
            name
            <input v-model="name" />
        </label>
        <label>
            course id
            <input v-model="course_id" />
        </label>
        <label>
            email
            <input v-model="email" />
        </label>
        <button @click="PerformChange">
            go
        </button>
    </div>
</template>

<script>
import courses from "@/middleware/courses/v1/requests/courses";
export default {
    name: "certificate_name",
    data() {
        return {
            name: '',
            course_id: '',
            email: ''
        }
    },
    methods: {
        async PerformChange() {
            let data = {
                name: this.name,
                id: this.course_id,
                email: this.email
            }
            let res = await courses.changeNameCertificate(data)

            console.log(res)
        }
    }
}
</script>
